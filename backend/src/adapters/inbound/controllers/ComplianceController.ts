import { IComplianceController } from "../../../core/ports/inbound/IComplianceController.js";
import { IComplianceRepository } from "../../../core/ports/outbound/IComplianceRepository.js";

export class ComplianceController implements IComplianceController {
  constructor(private repo: IComplianceRepository) {}

  async getComplianceBalance(shipId: string, year: number) {
    const existing = await this.repo.find(shipId, year);
    if (existing) return existing;
    throw new Error("No compliance record found");
  }

  async getAdjustedBalance(shipId: string, year: number) {
    const cb = await this.repo.find(shipId, year);
    if (!cb) throw new Error("CB not found");
    return { ...cb, adjusted: cb.cbGCO2eq }; // placeholder for future adjusted logic
  }
}
