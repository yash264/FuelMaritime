import { httpClient } from "../httpClient";

export async function bankSurplus(routeId: string, year: number) {
  console.log(routeId,year);
  const res = await httpClient.post("/banking/bank", { routeId, year });
  console.log(res.data);
  return res.data;
}

export async function applySurplus(routeId: string, year: number) {
  const res = await httpClient.post("/banking/apply", { routeId, year });
  return res.data;
}
