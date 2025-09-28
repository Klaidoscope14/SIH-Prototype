/**
 * Formats a number with specified decimal places
 */
export function formatNumber(value: number, decimals: number = 2): string {
  return value.toFixed(decimals)
}

/**
 * Formats a number as a percentage with specified decimal places
 */
export function formatPct(value: number, decimals: number = 1): string {
  return `${formatNumber(value, decimals)}%`
}

/**
 * Formats a large number with appropriate units (k, M, B)
 */
export function formatLargeNumber(value: number, decimals: number = 1): string {
  if (value >= 1e9) {
    return `${formatNumber(value / 1e9, decimals)}B`
  } else if (value >= 1e6) {
    return `${formatNumber(value / 1e6, decimals)}M`
  } else if (value >= 1e3) {
    return `${formatNumber(value / 1e3, decimals)}k`
  } else {
    return formatNumber(value, decimals)
  }
}

/**
 * Formats a number with thousands separators
 */
export function formatWithCommas(value: number, decimals: number = 0): string {
  return value.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  })
}

/**
 * Formats a number as currency (USD)
 */
export function formatCurrency(value: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals
  }).format(value)
}

/**
 * Formats a number as a weight (kg, tonnes)
 */
export function formatWeight(value: number, unit: 'kg' | 'tonnes' = 'kg', decimals: number = 2): string {
  const formatted = formatNumber(value, decimals)
  return `${formatted} ${unit}`
}

/**
 * Formats a number as a distance (km, m)
 */
export function formatDistance(value: number, unit: 'km' | 'm' = 'km', decimals: number = 1): string {
  const formatted = formatNumber(value, decimals)
  return `${formatted} ${unit}`
}

/**
 * Formats a number as an area (m², ha)
 */
export function formatArea(value: number, unit: 'm²' | 'ha' = 'm²', decimals: number = 2): string {
  const formatted = formatNumber(value, decimals)
  return `${formatted} ${unit}`
}

/**
 * Formats a number as a volume (m³, L)
 */
export function formatVolume(value: number, unit: 'm³' | 'L' = 'm³', decimals: number = 2): string {
  const formatted = formatNumber(value, decimals)
  return `${formatted} ${unit}`
}

/**
 * Formats a number as energy (MJ, kWh, MWh)
 */
export function formatEnergy(value: number, unit: 'MJ' | 'kWh' | 'MWh' = 'MJ', decimals: number = 1): string {
  const formatted = formatNumber(value, decimals)
  return `${formatted} ${unit}`
}

/**
 * Formats a number as CO2 equivalent (kg CO2e, t CO2e)
 */
export function formatCO2e(value: number, unit: 'kg CO2e' | 't CO2e' = 'kg CO2e', decimals: number = 2): string {
  const formatted = formatNumber(value, decimals)
  return `${formatted} ${unit}`
}
