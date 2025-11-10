import { Route } from "../../domain/entities/Routes.js";
import { ComplianceStatus } from "../../domain/valueObjects/complainceStatus.js";

const TARGET = 89.3368;

export interface RouteComparison {
  routeId: string;
  baseline: number;
  comparison: number;
  percentDiff: number;
  compliant: ComplianceStatus;
}

export class CompareRoutes {
  execute(baseline: Route, others: Route[]): RouteComparison[] {
    return others.map(r => {
      const percentDiff = ((r.ghgIntensity / baseline.ghgIntensity) - 1) * 100;
      const compliant = r.ghgIntensity <= TARGET ? 
        ComplianceStatus.COMPLIANT : 
        ComplianceStatus.NON_COMPLIANT;
      return {
        routeId: r.id,
        baseline: baseline.ghgIntensity,
        comparison: r.ghgIntensity,
        percentDiff,
        compliant
      };
    });
  }
}
