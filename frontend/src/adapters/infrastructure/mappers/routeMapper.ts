import { RouteData } from "../../ui/components/RoutesTable";

export function toRouteEntity(dto: any): RouteData {
  return {
    routeId: dto.routeId,
    vesselType: dto.vesselType,
    fuelType: dto.fuelType,
    year: dto.year,
    ghgIntensity: dto.ghgIntensity,
    fuelConsumption: dto.fuelConsumption,
    distance: dto.distance,
    totalEmissions: dto.totalEmissions,
  };
}
