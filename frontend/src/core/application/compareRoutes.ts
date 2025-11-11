import { Route } from "../domain/route";

export interface RouteComparison {
  routeId: string;
  baselineIntensity: number;
  comparisonIntensity: number;
  percentDiff: number;
  compliant: boolean;
}

export function compareRoutes(baseline: Route, comparison: Route): RouteComparison {
  const percentDiff = ((comparison.ghgIntensity / baseline.ghgIntensity) - 1) * 100;
  const compliant = comparison.ghgIntensity <= 89.3368; // Target

  return {
    routeId: comparison.routeId,
    baselineIntensity: baseline.ghgIntensity,
    comparisonIntensity: comparison.ghgIntensity,
    percentDiff,
    compliant,
  };
}
