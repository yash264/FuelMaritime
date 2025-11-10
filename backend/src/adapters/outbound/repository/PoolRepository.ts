import type { IPoolingRepository } from "../../../core/ports/outbound/IPoolingRepository.js";
import { Pool } from "../../../core/domain/entities/Pool.js";
import { db } from "../../../infrastructure/db/seed.js";

export class PoolRepository implements IPoolingRepository {
  async save(pool: Pool): Promise<void> {
    await db.$executeRaw`
      INSERT INTO pools (id, year, created_at)
      VALUES (${pool.id}, ${pool.year}, NOW());
    `;

    for (const m of pool.members) {
      await db.$executeRaw`
        INSERT INTO pool_members (pool_id, ship_id, cb_before, cb_after)
        VALUES (${pool.id}, ${m.shipId}, ${m.cbBefore}, ${m.cbAfter});
      `;
    }
  }

  async findByYear(year: number): Promise<Pool[]> {
    const pools = await db.$queryRaw<
      { id: string; year: number }[]
    >`SELECT * FROM pools WHERE year=${year};`;

    return pools.map((p) => new Pool(p.id, p.year, []));
  }
}

