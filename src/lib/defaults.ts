import type { Metal, RouteType, EnergyProfile, TransportMode } from './types'

// Default fuel mix percentages by metal and route type
export const DEFAULT_FUEL_MIXES: Record<Metal, Record<RouteType, EnergyProfile['fuel_mix_pct']>> = {
  aluminium: {
    primary: { natural_gas: 0.6, coal: 0.2, oil: 0.1, lpg: 0.05, other: 0.05 },
    secondary: { natural_gas: 0.8, coal: 0.1, oil: 0.05, lpg: 0.02, other: 0.03 },
    hybrid: { natural_gas: 0.7, coal: 0.15, oil: 0.07, lpg: 0.04, other: 0.04 },
  },
  aluminum: {
    primary: { natural_gas: 0.6, coal: 0.2, oil: 0.1, lpg: 0.05, other: 0.05 },
    secondary: { natural_gas: 0.8, coal: 0.1, oil: 0.05, lpg: 0.02, other: 0.03 },
    hybrid: { natural_gas: 0.7, coal: 0.15, oil: 0.07, lpg: 0.04, other: 0.04 },
  },
  copper: {
    primary: {
      natural_gas: 35, // Smelting and refining
      coal: 30,       // Significant coal usage
      oil: 20,        // Heavy fuel oil for furnaces
      lpg: 10,        // LPG for specific processes
      other: 5        // Other fuels
    },
    secondary: {
      natural_gas: 55, // More efficient recycling
      coal: 20,       // Reduced coal usage
      oil: 15,        // Less oil needed
      lpg: 5,         // Minimal LPG
      other: 5        // Other fuels
    },
    hybrid: {
      natural_gas: 45, // Balanced approach
      coal: 25,       // Moderate coal usage
      oil: 17,        // Moderate oil usage
      lpg: 8,         // Moderate LPG
      other: 5        // Other fuels
    }
  },
  steel: {
    primary: {
      natural_gas: 25, // Blast furnace processes
      coal: 50,       // High coal usage for coke
      oil: 15,        // Heavy fuel oil
      lpg: 5,         // Minimal LPG
      other: 5        // Other fuels
    },
    secondary: {
      natural_gas: 40, // Electric arc furnace
      coal: 30,       // Reduced coal usage
      oil: 20,        // Moderate oil usage
      lpg: 5,         // Minimal LPG
      other: 5        // Other fuels
    },
    hybrid: {
      natural_gas: 32, // Mixed approach
      coal: 40,       // Moderate coal usage
      oil: 17,        // Moderate oil usage
      lpg: 6,         // Moderate LPG
      other: 5        // Other fuels
    }
  },
  calcium: {
    primary: {
      natural_gas: 30, // Lime production
      coal: 40,       // High coal for heating
      oil: 20,        // Heavy fuel oil
      lpg: 5,         // Minimal LPG
      other: 5        // Other fuels
    },
    secondary: {
      natural_gas: 50, // More efficient recycling
      coal: 20,       // Less coal needed
      oil: 20,        // Reduced oil usage
      lpg: 5,         // Minimal LPG
      other: 5        // Other fuels
    },
    hybrid: {
      natural_gas: 40, // Balanced approach
      coal: 30,       // Moderate coal usage
      oil: 20,        // Moderate oil usage
      lpg: 5,         // Minimal LPG
      other: 5        // Other fuels
    }
  },
  lithium: {
    primary: {
      natural_gas: 20, // Mining operations
      coal: 10,       // Minimal coal
      oil: 10,        // Minimal oil
      lpg: 5,         // Minimal LPG
      other: 55       // High renewables/solar
    },
    secondary: {
      natural_gas: 30, // Clean recycling
      coal: 5,        // Very minimal coal
      oil: 5,         // Very minimal oil
      lpg: 5,         // Minimal LPG
      other: 55       // High renewables
    },
    hybrid: {
      natural_gas: 25, // Mixed approach
      coal: 7.5,      // Low coal usage
      oil: 7.5,       // Low oil usage
      lpg: 5,         // Minimal LPG
      other: 55       // High renewables
    }
  }
}

// Default plant yields by metal and route type (percentage)
export const DEFAULT_YIELDS: Record<Metal, Record<RouteType, number>> = {
  aluminium: {
    primary: 85,  // Typical smelting yield
    secondary: 92, // Higher yield for recycling
    hybrid: 88    // Mixed yield
  },
  aluminum: {
    primary: 85,  // Typical smelting yield
    secondary: 92, // Higher yield for recycling
    hybrid: 88    // Mixed yield
  },
  copper: {
    primary: 88,  // Good smelting yield
    secondary: 95, // Very high recycling yield
    hybrid: 91    // Mixed yield
  },
  steel: {
    primary: 90,  // Good blast furnace yield
    secondary: 96, // Very high EAF yield
    hybrid: 93    // Mixed yield
  },
  calcium: {
    primary: 75,  // Lime production yield
    secondary: 88, // Good recycling yield
    hybrid: 81    // Mixed yield
  },
  lithium: {
    primary: 60,  // Mining extraction yield
    secondary: 95, // Excellent recycling yield
    hybrid: 77    // Mixed yield
  }
}

// Grid emission factors by region (kg CO2e per kWh)
// Based on typical grid emission factors for major regions
export const GRID_EMISSION_FACTORS: Record<EnergyProfile['grid_region'], number> = {
  'IN': 0.82,  // India - coal-heavy grid
  'EU': 0.28,  // European Union - renewable mix
  'US': 0.39,  // United States - mixed grid
  'CN': 0.58,  // China - coal-heavy but improving
  'OTHER': 0.45 // Global average
}

// Transport emission factors (kg CO2e per tonne-kilometer)
// Based on typical transport emission factors
export const TRANSPORT_EMISSION_FACTORS: Record<TransportMode, number> = {
  truck: 0.12,  // Road transport - diesel trucks
  rail: 0.03,   // Rail transport - electric/diesel
  sea: 0.01,    // Maritime transport - heavy fuel oil
  air: 0.85     // Air transport - jet fuel
}

// Default energy consumption by metal and route (kWh per tonne)
export const DEFAULT_ELECTRICITY_CONSUMPTION: Record<Metal, Record<RouteType, number>> = {
  aluminium: {
    primary: 14500,  // High energy for smelting
    secondary: 800,  // Low energy for recycling
    hybrid: 7650     // Mixed consumption
  },
  aluminum: {
    primary: 14500,  // High energy for smelting
    secondary: 800,  // Low energy for recycling
    hybrid: 7650     // Mixed consumption
  },
  copper: {
    primary: 2500,   // Moderate energy for smelting
    secondary: 400,  // Very low energy for recycling
    hybrid: 1450     // Mixed consumption
  },
  steel: {
    primary: 500,    // Low energy for blast furnace
    secondary: 600,  // Moderate energy for EAF
    hybrid: 550      // Mixed consumption
  },
  calcium: {
    primary: 800,    // Moderate energy for lime production
    secondary: 200,  // Low energy for recycling
    hybrid: 500      // Mixed consumption
  },
  lithium: {
    primary: 2000,   // High energy for mining/processing
    secondary: 100,  // Very low energy for recycling
    hybrid: 1050     // Mixed consumption
  }
}

// Default onsite renewables percentage by region
export const DEFAULT_RENEWABLES_PCT: Record<EnergyProfile['grid_region'], number> = {
  'IN': 15,   // India - growing renewables
  'EU': 35,   // European Union - high renewables
  'US': 20,   // United States - moderate renewables
  'CN': 25,   // China - rapidly growing renewables
  'OTHER': 22 // Global average
}

// Default recycled content percentages by metal and route
export const DEFAULT_RECYCLED_CONTENT: Record<Metal, Record<RouteType, number>> = {
  aluminium: {
    primary: 0,    // No recycled content in primary
    secondary: 95, // High recycled content
    hybrid: 40     // Mixed recycled content
  },
  aluminum: {
    primary: 0,    // No recycled content in primary
    secondary: 95, // High recycled content
    hybrid: 40     // Mixed recycled content
  },
  copper: {
    primary: 0,    // No recycled content in primary
    secondary: 90, // High recycled content
    hybrid: 35     // Mixed recycled content
  },
  steel: {
    primary: 0,    // No recycled content in primary
    secondary: 85, // High recycled content
    hybrid: 30     // Mixed recycled content
  },
  calcium: {
    primary: 0,    // No recycled content in primary
    secondary: 70, // Moderate recycled content
    hybrid: 25     // Mixed recycled content
  },
  lithium: {
    primary: 0,    // No recycled content in primary
    secondary: 80, // Good recycled content
    hybrid: 35     // Mixed recycled content
  }
}

// Default byproduct credit percentages by metal and route
export const DEFAULT_BYPRODUCT_CREDITS: Record<Metal, Record<RouteType, number>> = {
  aluminium: {
    primary: 5,   // Some byproduct credits
    secondary: 2, // Fewer byproduct credits
    hybrid: 3     // Mixed byproduct credits
  },
  aluminum: {
    primary: 5,   // Some byproduct credits
    secondary: 2, // Fewer byproduct credits
    hybrid: 3     // Mixed byproduct credits
  },
  copper: {
    primary: 8,   // Good byproduct credits (sulfuric acid, etc.)
    secondary: 3, // Fewer byproduct credits
    hybrid: 5     // Mixed byproduct credits
  },
  steel: {
    primary: 3,   // Some byproduct credits
    secondary: 1, // Fewer byproduct credits
    hybrid: 2     // Mixed byproduct credits
  },
  calcium: {
    primary: 2,   // Some byproduct credits (CO2)
    secondary: 1, // Fewer byproduct credits
    hybrid: 1.5   // Mixed byproduct credits
  },
  lithium: {
    primary: 1,   // Minimal byproduct credits
    secondary: 0.5, // Very few byproduct credits
    hybrid: 0.75  // Mixed byproduct credits
  }
}
