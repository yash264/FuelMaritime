import type { IBankingRepository } from "../../ports/outbound/IBankingRepository.js";
import { ComplianceBalance } from "../../domain/entities/ComplianceBalance.js";

export class ApplyBankedCredit {
  constructor(private bankingRepo: IBankingRepository) {}

  async execute(cb: ComplianceBalance, amountToApply: number): Promise<ComplianceBalance> {
    const available = await this.bankingRepo.getAvailable(cb.shipId, cb.year);
    if (amountToApply > available) throw new Error("Not enough banked surplus");

    const updatedCB = new ComplianceBalance(
      cb.shipId,
      cb.year,
      cb.cbGCO2eq + amountToApply
    );

    await this.bankingRepo.apply(cb.shipId, cb.year, amountToApply);
    return updatedCB;
  }
}
