import { httpClient } from "../httpClient";

export async function createPool(payload: any) {
  const res = await httpClient.post("/pools", payload);
  return res.data;
}
