import { IPoolingController } from "../../../core/ports/inbound/IPoolingController.js";
import { IPoolingRepository } from "../../../core/ports/outbound/IPoolingRepository.js";
import { Pool } from "../../../core/domain/entities/Pool.js";
import { CreatePool } from "../../../core/application/useCases/CreatePool.js";

export class PoolingController implements IPoolingController {
  constructor(private repo: IPoolingRepository) {}

  async createPool(data: any) {
    const pool = new Pool(data.id, data.year, data.members);
    const useCase = new CreatePool(this.repo);
    return useCase.execute(pool);
  }
}

