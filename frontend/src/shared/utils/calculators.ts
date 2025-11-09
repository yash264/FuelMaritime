import { ENERGY_FACTOR_MJ_PER_TON, TARGET_INTENSITY_2025 } from "../constants/fuelEuConstants";

export function computeComplianceBalance(actualIntensity: number, fuelConsumption: number): number {
  const energy = fuelConsumption * ENERGY_FACTOR_MJ_PER_TON;
  return (TARGET_INTENSITY_2025 - actualIntensity) * energy;
}
