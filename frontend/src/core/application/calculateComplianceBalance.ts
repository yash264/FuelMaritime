import { Route } from "../domain/route";
import { ComplianceBalance } from "../domain/complianceBalance";

const TARGET_INTENSITY = 89.3368; // 2025 target (gCO2e/MJ)
const ENERGY_FACTOR = 41000; // MJ per tonne of fuel

export function calculateComplianceBalance(route: Route): ComplianceBalance {
  const energy = route.fuelConsumption * ENERGY_FACTOR;
  const diff = TARGET_INTENSITY - route.ghgIntensity;
  const cb = diff * energy;

  return new ComplianceBalance(cb, 0, cb);
}
