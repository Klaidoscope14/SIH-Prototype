import type { Phase1Inputs, Phase1Results, Metal, RouteType } from './types'
import { 
  DEFAULT_ELECTRICITY_CONSUMPTION, 
  DEFAULT_FUEL_MIXES, 
  GRID_EMISSION_FACTORS, 
  TRANSPORT_EMISSION_FACTORS 
} from './defaults'

// Simple process energy factors (MJ per tonne) for different fuel types
const PROCESS_ENERGY_FACTORS = {
  natural_gas: 45,  // MJ per tonne of metal
  coal: 35,        // MJ per tonne of metal
  oil: 40,         // MJ per tonne of metal
  lpg: 50,         // MJ per tonne of metal
  other: 42        // MJ per tonne of metal
} as const

// Water consumption factors (m³ per tonne) by metal and route
const WATER_FACTORS: Record<Metal, Record<RouteType, number>> = {
  aluminium: {
    primary: 12,   // High water usage for smelting
    secondary: 2,  // Low water usage for recycling
    hybrid: 7      // Mixed water usage
  },
  copper: {
    primary: 8,    // Moderate water usage
    secondary: 1,  // Very low water usage
    hybrid: 4      // Mixed water usage
  },
  steel: {
    primary: 6,    // Moderate water usage
    secondary: 1,  // Low water usage
    hybrid: 3      // Mixed water usage
  }
}

/**
 * Validates that percentage values sum to 100%
 */
export function validatePercentSum(parts: { label: string; value: number }[]): { ok: boolean; total: number } {
  const total = parts.reduce((sum, part) => sum + part.value, 0)
  const tolerance = 0.1 // Allow 0.1% tolerance for rounding
  return {
    ok: Math.abs(total - 100) <= tolerance,
    total: Math.round(total * 100) / 100 // Round to 2 decimal places
  }
}

/**
 * Estimates missing values in Phase1Inputs using defaults
 */
export function estimateMissing(inputs: Phase1Inputs): Phase1Inputs {
  const { metal } = inputs
  const { route } = inputs.route
  
  // Fill in missing electricity consumption
  const electricity_kwh_per_t = inputs.route.energy.electricity_kwh_per_t ?? 
    DEFAULT_ELECTRICITY_CONSUMPTION[metal][route]
  
  // Fill in missing fuel mix if all zeros
  const fuelMix = inputs.route.energy.fuel_mix_pct
  const hasFuelMix = Object.values(fuelMix).some(value => value > 0)
  const defaultFuelMix = DEFAULT_FUEL_MIXES[metal][route]
  
  const finalFuelMix = hasFuelMix ? fuelMix : defaultFuelMix
  
  // Fill in missing renewables percentage
  const onsite_renewables_pct = inputs.route.energy.onsite_renewables_pct || 0
  
  // Fill in missing efficiency bonus
  const efficiency_bonus_pct = inputs.route.energy.efficiency_bonus_pct || 0

  return {
    ...inputs,
    route: {
      ...inputs.route,
      energy: {
        ...inputs.route.energy,
        electricity_kwh_per_t,
        fuel_mix_pct: finalFuelMix,
        onsite_renewables_pct,
        efficiency_bonus_pct
      }
    }
  }
}

/**
 * Calculates Phase 1 LCA results from inputs
 */
export function calcPhase1(inputs: Phase1Inputs): Phase1Results {
  const filledInputs = estimateMissing(inputs)
  const { metal } = filledInputs
  const { route } = filledInputs.route
  
  // Convert functional unit to tonnes
  const tonnes = filledInputs.functional_unit_kg / 1000
  
  // Get grid emission factor
  const gridEf = GRID_EMISSION_FACTORS[filledInputs.route.energy.grid_region]
  
  // Calculate electricity CO2 emissions
  const electricity_kwh = (filledInputs.route.energy.electricity_kwh_per_t || 0) * tonnes
  const electricity_co2 = electricity_kwh * gridEf
  
  // Calculate fuel CO2 emissions
  const fuelMix = filledInputs.route.energy.fuel_mix_pct
  const fuel_co2 = Object.entries(fuelMix).reduce((total, [fuelType, percentage]) => {
    const energyFactor = PROCESS_ENERGY_FACTORS[fuelType as keyof typeof PROCESS_ENERGY_FACTORS]
    const fuelEnergy = (percentage / 100) * energyFactor * tonnes
    // Simple fuel emission factor (kg CO2e per MJ)
    const fuelEf = 0.08 // Rough average for fossil fuels
    return total + (fuelEnergy * fuelEf)
  }, 0)
  
  // Calculate transport CO2 emissions
  const transport_co2 = (filledInputs.route.transport_inbound || []).reduce((total, leg) => {
    const mass = leg.mass_tonnes || tonnes
    const tkm = leg.distance_km * mass
    const modeEf = TRANSPORT_EMISSION_FACTORS[leg.mode]
    return total + (tkm * modeEf)
  }, 0)
  
  // Total GWP
  const gwp_kgco2e = electricity_co2 + fuel_co2 + transport_co2
  
  // Calculate total energy (MJ)
  const electricity_mj = electricity_kwh * 3.6 // Convert kWh to MJ
  const fuel_mj = Object.entries(fuelMix).reduce((total, [fuelType, percentage]) => {
    const energyFactor = PROCESS_ENERGY_FACTORS[fuelType as keyof typeof PROCESS_ENERGY_FACTORS]
    return total + ((percentage / 100) * energyFactor * tonnes)
  }, 0)
  const energy_mj = electricity_mj + fuel_mj
  
  // Calculate water consumption
  const water_factor = WATER_FACTORS[metal][route]
  const water_m3 = water_factor * tonnes
  
  // Calculate hotspots (normalized shares)
  const hotspots = [
    { name: 'Electricity', share_pct: (electricity_co2 / gwp_kgco2e) * 100 },
    { name: 'Fuels', share_pct: (fuel_co2 / gwp_kgco2e) * 100 },
    { name: 'Transport', share_pct: (transport_co2 / gwp_kgco2e) * 100 }
  ].map(hotspot => ({
    ...hotspot,
    share_pct: Math.round(hotspot.share_pct * 100) / 100 // Round to 2 decimal places
  }))
  
  return {
    gwp_kgco2e: Math.round(gwp_kgco2e * 100) / 100,
    energy_mj: Math.round(energy_mj * 100) / 100,
    water_m3: Math.round(water_m3 * 100) / 100,
    hotspots
  }
}
