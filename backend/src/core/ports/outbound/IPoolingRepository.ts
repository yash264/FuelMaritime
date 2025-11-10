import { Pool } from "../../domain/entities/Pool.js";

export interface IPoolingRepository {
  save(pool: Pool): Promise<void>;
  findByYear(year: number): Promise<Pool[]>;
}
