import { ComplianceBalance } from "../../domain/entities/ComplianceBalance.js";

export interface IComplianceRepository {
  save(cb: ComplianceBalance): Promise<void>;
  find(shipId: string, year: number): Promise<ComplianceBalance | null>;
}
