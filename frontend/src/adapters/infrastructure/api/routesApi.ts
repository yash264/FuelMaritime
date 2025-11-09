import { httpClient } from "../httpClient";
import { toRouteEntity } from "../mappers/routeMapper";

export async function fetchRoutes() {
  const res = await httpClient.get("/routes");
  return res.data.map(toRouteEntity);
}

export async function setBaseline(routeId: string) {
  const res = await httpClient.post(`/routes/${routeId}/baseline`);
  return res.data;
}

export async function fetchComparison() {
  const res = await httpClient.get("/routes/comparison");
  return res.data;
}
