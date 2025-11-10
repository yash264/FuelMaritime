import { ComputeComplianceBalance } from "../useCases/ComputeComplianceBalance.js";
import { CompareRoutes } from "../useCases/CompareRoutes.js";
import { Route } from "../../domain/entities/Routes.js";
import type { IComplianceRepository } from "../../ports/outbound/IComplianceRepository.js";

export class ComplianceService {
  private computeCB: ComputeComplianceBalance;
  private compareRoutes: CompareRoutes;

  constructor(private repo: IComplianceRepository) {
    this.computeCB = new ComputeComplianceBalance(repo);
    this.compareRoutes = new CompareRoutes();
  }

  async computeBalance(route: Route) {
    return this.computeCB.execute(route);
  }

  compare(baseline: Route, others: Route[]) {
    return this.compareRoutes.execute(baseline, others);
  }
}
