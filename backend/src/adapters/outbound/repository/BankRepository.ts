import type { IBankingRepository } from "../../../core/ports/outbound/IBankingRepository.js";
import { BankEntry } from "../../../core/domain/entities/BankEntry.js";
import { db } from "../../../infrastructure/db/seed.js";

export class BankRepository implements IBankingRepository {
  async save(entry: BankEntry): Promise<void> {
    await db.$executeRaw`
      INSERT INTO bank_entries (ship_id, year, amount_gco2eq)
      VALUES (${entry.shipId}, ${entry.year}, ${entry.amountGCO2eq});
    `;
  }

  async getAvailable(shipId: string, year: number): Promise<number> {
    const result = await db.$queryRaw<
      { total: number | null }[]
    >`SELECT SUM(amount_gco2eq) AS total FROM bank_entries WHERE ship_id=${shipId} AND year <= ${year};`;

    return Number(result[0]?.total || 0);
  }

  async apply(shipId: string, year: number, amount: number): Promise<void> {
    await db.$executeRaw`
      INSERT INTO bank_entries (ship_id, year, amount_gco2eq)
      VALUES (${shipId}, ${year}, ${-amount});
    `;
  }
}

