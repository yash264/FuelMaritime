import { Route } from "../../domain/entities/Routes.js";
import { ComplianceBalance } from "../../domain/entities/ComplianceBalance.js";
import type { IComplianceRepository } from "../../ports/outbound/IComplianceRepository.js";

const TARGET_2025 = 89.3368;
const ENERGY_DENSITY = 41000; // MJ/t

export class ComputeComplianceBalance {
  constructor(private complianceRepo: IComplianceRepository) {}

  async execute(route: Route): Promise<ComplianceBalance> {
    const energyInScope = route.fuelConsumption * ENERGY_DENSITY;
    const cbValue = (TARGET_2025 - route.ghgIntensity) * energyInScope;
    const cb = new ComplianceBalance(route.id, route.year, cbValue);
    await this.complianceRepo.save(cb);
    return cb;
  }
}

