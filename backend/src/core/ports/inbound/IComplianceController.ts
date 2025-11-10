export interface IComplianceController {
    getComplianceBalance(shipId: string, year: number): Promise<any>;
    getAdjustedBalance(shipId: string, year: number): Promise<any>;
  }
  