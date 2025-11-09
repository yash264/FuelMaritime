import { ComplianceBalance } from "../domain/complianceBalance";

export interface IComplianceRepository {
  fetchComplianceBalance(year: number): Promise<ComplianceBalance>;
  fetchAdjustedCB(year: number): Promise<any>;
}
