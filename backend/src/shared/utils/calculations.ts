// Common FuelEU-related formulas

export const ENERGY_DENSITY_MJ_PER_TON = 41000;
export const TARGET_INTENSITY_2025 = 89.3368;

export function computeComplianceBalance(actual: number, consumption: number) {
  const energy = consumption * ENERGY_DENSITY_MJ_PER_TON;
  return (TARGET_INTENSITY_2025 - actual) * energy;
}

export function computePercentDifference(base: number, comparison: number) {
  return ((comparison / base) - 1) * 100;
}
