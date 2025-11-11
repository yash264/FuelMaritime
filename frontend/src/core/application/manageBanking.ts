import { ComplianceBalance } from "../domain/complianceBalance";

export function bankSurplus(cb: ComplianceBalance, amount: number): ComplianceBalance {
  if (cb.cb_after <= 0) throw new Error("Cannot bank a non-positive CB.");
  return cb.bank(amount);
}

export function applyBanked(cb: ComplianceBalance, amount: number): ComplianceBalance {
  if (amount > cb.cb_before) throw new Error("Cannot apply more than available CB.");
  return cb.apply(amount);
}
