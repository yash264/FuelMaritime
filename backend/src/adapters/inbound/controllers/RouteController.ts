import { IRouteController } from "../../../core/ports/inbound/IRouteController.js";
import { IRouteRepository } from "../../../core/ports/outbound/IRouteRepository.js";
import { Route } from "../../../core/domain/entities/Routes.js";
import { CompareRoutes } from "../../../core/application/useCases/CompareRoutes.js";

export class RouteController implements IRouteController {
  constructor(private repo: IRouteRepository) {}

  async getAllRoutes(): Promise<Route[]> {
    return this.repo.findAll();
  }

  async setBaseline(routeId: string): Promise<void> {
    await this.repo.setBaseline(routeId);
  }

  async getComparison(): Promise<any> {
    const baseline = await this.repo.findBaseline();
    if (!baseline) throw new Error("No baseline route set");

    const routes = await this.repo.findAll();
    const others = routes.filter(r => r.id !== baseline.id);

    const comparator = new CompareRoutes();
    return comparator.execute(baseline, others);
  }
}
