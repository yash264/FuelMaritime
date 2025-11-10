import type { IBankingController } from "../../../core/ports/inbound/IBankingController.js";
import type { IBankingRepository } from "../../../core/ports/outbound/IBankingRepository.js";
import { BankSurplus } from "../../../core/application/useCases/BankSurplus.js";
import { ApplyBankedCredit } from "../../../core/application/useCases/ApplyBankedCredit.js";
import { ComplianceBalance } from "../../../core/domain/entities/ComplianceBalance.js";

export class BankingController implements IBankingController {
  constructor(private repo: IBankingRepository) {}

  async bankSurplus(shipId: string, year: number) {
    const cb = new ComplianceBalance(shipId, year, 10000); // mock value; replace with real CB lookup
    const useCase = new BankSurplus(this.repo);
    return useCase.execute(cb);
  }

  async applyBankedCredit(shipId: string, year: number, amount: number) {
    const cb = new ComplianceBalance(shipId, year, -5000); // mock deficit
    const useCase = new ApplyBankedCredit(this.repo);
    return useCase.execute(cb, amount);
  }
}
