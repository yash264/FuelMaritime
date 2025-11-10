import { BankEntry } from "../../domain/entities/BankEntry.js";

export interface IBankingRepository {
  save(entry: BankEntry): Promise<void>;
  getAvailable(shipId: string, year: number): Promise<number>;
  apply(shipId: string, year: number, amount: number): Promise<void>;
}
