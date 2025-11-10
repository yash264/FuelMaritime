export interface IBankingController {
    bankSurplus(shipId: string, year: number): Promise<any>;
    applyBankedCredit(shipId: string, year: number, amount: number): Promise<any>;
  }
  