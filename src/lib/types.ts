// Metal types supported by the LCA system
export type Metal = 'aluminium' | 'aluminum' | 'copper' | 'steel' | 'calcium' | 'lithium'

// Composition of the metal product
export interface CompositionPart {
  component: string
  percent: number
}

// Production route types
export type RouteType = 'primary' | 'secondary' | 'hybrid'

// Transportation modes
export type TransportMode = 'truck' | 'rail' | 'sea' | 'air'

// Individual transport leg with mode, distance, and optional mass
export interface TransportLeg {
  mode: TransportMode
  distance_km: number
  mass_tonnes?: number
}

// Energy profile for production
export interface EnergyProfile {
  electricity_kwh_per_t: number | null
  fuel_mix_pct: {
    natural_gas: number
    coal: number
    oil: number
    lpg: number
    other: number
  }
  grid_region: 'IN' | 'EU' | 'US' | 'CN' | 'OTHER'
  onsite_renewables_pct: number
  efficiency_bonus_pct?: number
}

// Complete production route configuration
export interface ProductionRoute {
  route: RouteType
  recycled_content_pct?: number
  plant_yield_pct: number
  byproduct_credit_pct?: number
  energy: EnergyProfile
  transport_inbound?: TransportLeg[]
}

// Phase 1 input data structure
export interface Phase1Inputs {
  product_name: string
  metal: Metal
  functional_unit_kg: number
  composition: CompositionPart[]
  route: ProductionRoute
}

// Phase 1 results structure
export interface Phase1Results {
  gwp_kgco2e: number
  energy_mj: number
  water_m3: number
  hotspots: {
    name: string
    share_pct: number
  }[]
}
