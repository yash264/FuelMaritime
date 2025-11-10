import { ComplianceBalance } from "../../domain/entities/ComplianceBalance.js";
import { BankEntry } from "../../domain/entities/BankEntry.js";
import type { IBankingRepository } from "../../ports/outbound/IBankingRepository.js";

export class BankSurplus {
  constructor(private bankingRepo: IBankingRepository) {}

  async execute(cb: ComplianceBalance): Promise<BankEntry> {
    if (cb.cbGCO2eq <= 0) throw new Error("No surplus to bank");
    const entry = new BankEntry(cb.shipId, cb.year, cb.cbGCO2eq);
    await this.bankingRepo.save(entry);
    return entry;
  }
}
