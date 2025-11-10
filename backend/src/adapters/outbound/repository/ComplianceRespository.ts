import { IComplianceRepository } from "../../../core/ports/outbound/IComplianceRepository.js";
import { ComplianceBalance } from "../../../core/domain/entities/ComplianceBalance.js";
import { db } from "../../../infrastructure/db/connection.js";

export class ComplianceRepository implements IComplianceRepository {
  async save(cb: ComplianceBalance): Promise<void> {
    await db.query(
      `
      INSERT INTO ship_compliance (ship_id, year, cb_gco2eq)
      VALUES ($1, $2, $3)
      ON CONFLICT (ship_id, year)
      DO UPDATE SET cb_gco2eq = EXCLUDED.cb_gco2eq;
      `,
      [cb.shipId, cb.year, cb.cbGCO2eq]
    );
  }

  async find(shipId: string, year: number): Promise<ComplianceBalance | null> {
    const result = await db.query(
      `
      SELECT ship_id AS "shipId", year, cb_gco2eq AS "cbGCO2eq"
      FROM ship_compliance
      WHERE ship_id = $1 AND year = $2;
      `,
      [shipId, year]
    );

    const row = result.rows[0];
    return row ? new ComplianceBalance(row.shipId, row.year, row.cbGCO2eq) : null;
  }
}
