import type { IComplianceRepository } from "../../../core/ports/outbound/IComplianceRepository.js";
import { ComplianceBalance } from "../../../core/domain/entities/ComplianceBalance.js";
import { db } from "../../../infrastructure/db/seed.js";

export class ComplianceRepository implements IComplianceRepository {
  async save(cb: ComplianceBalance): Promise<void> {
    await db.$executeRaw`
      INSERT INTO ship_compliance (ship_id, year, cb_gco2eq)
      VALUES (${cb.shipId}, ${cb.year}, ${cb.cbGCO2eq})
      ON CONFLICT (ship_id, year)
      DO UPDATE SET cb_gco2eq = ${cb.cbGCO2eq};
    `;
  }

  async find(shipId: string, year: number): Promise<ComplianceBalance | null> {
    const rows = await db.$queryRaw<
      { ship_id: string; year: number; cb_gco2eq: number }[]
    >`SELECT * FROM ship_compliance WHERE ship_id=${shipId} AND year=${year}`;

    const row = rows[0];
    return row ? new ComplianceBalance(row.ship_id, row.year, row.cb_gco2eq) : null;
  }
}
