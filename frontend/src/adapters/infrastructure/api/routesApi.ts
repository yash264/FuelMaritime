import { httpClient } from "../httpClient";
import { toRouteEntity } from "../mappers/routeMapper";
import { RouteData } from "../../ui/components/RoutesTable";

// Type describing one route item from backend
interface RouteApiItem {
  props: {
    id: string;
    vesselType: string;
    fuelType: string;
    year: number;
    ghgIntensity: number;
    fuelConsumption: number;
    distance: number;
    totalEmissions: number;
  };
}

export async function fetchRoutes(): Promise<RouteData[]> {
  // Tell Axios the endpoint returns an array directly
  const res = await httpClient.get<RouteApiItem[]>("/routes");

  return res.data.map((item: RouteApiItem) =>
    toRouteEntity({
      routeId: item.props.id,
      vesselType: item.props.vesselType,
      fuelType: item.props.fuelType,
      year: item.props.year,
      ghgIntensity: item.props.ghgIntensity,
      fuelConsumption: item.props.fuelConsumption,
      distance: item.props.distance,
      totalEmissions: item.props.totalEmissions,
    })
  );
}


export async function setBaseline(routeId: string) {
  const res = await httpClient.post(`/routes/${routeId}/baseline`);
  return res.data;
}

export async function fetchComparison() {
  const res = await httpClient.get("/routes/comparison");
  return res.data;
}
