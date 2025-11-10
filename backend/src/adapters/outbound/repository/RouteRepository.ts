import type { IRouteRepository } from "../../../core/ports/outbound/IRouteRepository.js";
import { Route } from "../../../core/domain/entities/Routes.js";
import { db } from "../../../infrastructure/db/seed.js";

export class RouteRepository implements IRouteRepository {
  async findAll(): Promise<Route[]> {
    const rows = await db.$queryRaw<
      {
        route_id: string;
        vessel_type: string;
        fuel_type: string;
        year: number;
        ghg_intensity: number;
        fuel_consumption: number;
        distance: number;
        total_emissions: number;
        is_baseline: boolean;
      }[]
    >`SELECT * FROM routes ORDER BY id;`;

    return rows.map(
      (r) =>
        new Route({
          id: r.route_id,
          vesselType: r.vessel_type,
          fuelType: r.fuel_type,
          year: r.year,
          ghgIntensity: r.ghg_intensity,
          fuelConsumption: r.fuel_consumption,
          distance: r.distance,
          totalEmissions: r.total_emissions,
          isBaseline: r.is_baseline,
        })
    );
  }

  async findBaseline(): Promise<Route | null> {
    const rows = await db.$queryRaw<
      {
        route_id: string;
        vessel_type: string;
        fuel_type: string;
        year: number;
        ghg_intensity: number;
        fuel_consumption: number;
        distance: number;
        total_emissions: number;
        is_baseline: boolean;
      }[]
    >`SELECT * FROM routes WHERE is_baseline = true LIMIT 1;`;

    const r = rows[0];
    return r
      ? new Route({
          id: r.route_id,
          vesselType: r.vessel_type,
          fuelType: r.fuel_type,
          year: r.year,
          ghgIntensity: r.ghg_intensity,
          fuelConsumption: r.fuel_consumption,
          distance: r.distance,
          totalEmissions: r.total_emissions,
          isBaseline: r.is_baseline,
        })
      : null;
  }

  async setBaseline(id: string): Promise<void> {
    await db.$executeRaw`UPDATE routes SET is_baseline = false;`;
    await db.$executeRaw`UPDATE routes SET is_baseline = true WHERE route_id = ${id};`;
  }
}
