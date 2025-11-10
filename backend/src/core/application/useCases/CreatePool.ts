import { Pool } from "../../domain/entities/Pool.js";
import type { IPoolingRepository } from "../../ports/outbound/IPoolingRepository.js";

export class CreatePool {
  constructor(private poolingRepo: IPoolingRepository) {}

  async execute(pool: Pool): Promise<Pool> {
    if (!pool.validate()) {
      throw new Error("Pool invalid: total CB must be >= 0");
    }

    // greedy allocation
    const sorted = [...pool.members].sort((a, b) => b.cbBefore - a.cbBefore);
    const deficits = sorted.filter(m => m.cbBefore < 0);
    const surpluses = sorted.filter(m => m.cbBefore > 0);

    for (const deficit of deficits) {
      let needed = Math.abs(deficit.cbBefore);
      for (const surplus of surpluses) {
        if (needed <= 0) break;
        const transfer = Math.min(needed, surplus.cbBefore);
        surplus.cbBefore -= transfer;
        deficit.cbBefore += transfer;
        needed -= transfer;
      }
    }

    pool.members = [...deficits, ...surpluses].map(m => ({
      ...m,
      cbAfter: m.cbBefore
    }));

    await this.poolingRepo.save(pool);
    return pool;
  }
}
