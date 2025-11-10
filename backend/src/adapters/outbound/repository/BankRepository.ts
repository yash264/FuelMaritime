import { IBankingRepository } from "../../../core/ports/outbound/IBankingRepository.js";
import { BankEntry } from "../../../core/domain/entities/BankEntry.js";
import { db } from "../../../infrastructure/db/connection.js";

export class BankRepository implements IBankingRepository {
  async save(entry: BankEntry): Promise<void> {
    await db.query(
      `
      INSERT INTO bank_entries (ship_id, year, amount_gco2eq)
      VALUES ($1, $2, $3);
      `,
      [entry.shipId, entry.year, entry.amountGCO2eq]
    );
  }

  async getAvailable(shipId: string, year: number): Promise<number> {
    const result = await db.query<{ total: number | null }>(
      `
      SELECT SUM(amount_gco2eq) AS total
      FROM bank_entries
      WHERE ship_id = $1 AND year <= $2;
      `,
      [shipId, year]
    );

    return Number(result.rows[0]?.total || 0);
  }

  async apply(shipId: string, year: number, amount: number): Promise<void> {
    await db.query(
      `
      INSERT INTO bank_entries (ship_id, year, amount_gco2eq)
      VALUES ($1, $2, $3);
      `,
      [shipId, year, -amount]
    );
  }
}


