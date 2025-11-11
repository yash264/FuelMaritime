import { httpClient } from "../httpClient";
import { toComplianceEntity } from "../mappers/complianceMapper";

export async function fetchComplianceBalance(routeId: string, year: number) {
  console.log(routeId,year);
  const res = await httpClient.post("/compliance/cb", { routeId, year });
  return toComplianceEntity(res.data);
}

export async function fetchAdjustedCB(routeId: string, year: number) {
  const res = await httpClient.post("/compliance/adjustCb", { routeId, year });
  return res.data;
}

