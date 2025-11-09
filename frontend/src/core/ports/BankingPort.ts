export interface IBankingRepository {
    bankSurplus(): Promise<void>;
    applySurplus(): Promise<void>;
  }
  