import { httpClient } from "../httpClient";
import { toComplianceEntity } from "../mappers/complianceMapper";

export async function fetchComplianceBalance(year: number) {
  const res = await httpClient.get(`/compliance/cb?year=${year}`);
  return toComplianceEntity(res.data);
}

export async function fetchAdjustedCB(year: number) {
  const res = await httpClient.get(`/compliance/adjusted-cb?year=${year}`);
  return res.data;
}
