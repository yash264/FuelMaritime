import { httpClient } from "../httpClient";

export async function bankSurplus() {
  const res = await httpClient.post("/banking/bank");
  return res.data;
}

export async function applySurplus() {
  const res = await httpClient.post("/banking/apply");
  return res.data;
}
