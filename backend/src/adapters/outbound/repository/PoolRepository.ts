import type { IRouteRepository } from "../../../core/ports/outbound/IRouteRepository.js";
import { Route } from "../../../core/domain/entities/Routes.js";
import { db } from "../../../infrastructure/db/connection.js";

export class RouteRepository implements IRouteRepository {
  // Fetch all routes
  async findAll(): Promise<Route[]> {
    const result = await db.query(`
      SELECT 
        routeid AS "routeId",
        vesseltype AS "vesselType",
        fueltype AS "fuelType",
        year,
        ghgintensity AS "ghgIntensity",
        fuelconsumption AS "fuelConsumption",
        distance,
        totalemissions AS "totalEmissions",
        isbaseline AS "isBaseline"
      FROM "Route"
      ORDER BY id;
    `);

    return result.rows.map(
      (r) =>
        new Route({
          id: r.routeId,
          vesselType: r.vesselType,
          fuelType: r.fuelType,
          year: r.year,
          ghgIntensity: r.ghgIntensity,
          fuelConsumption: r.fuelConsumption,
          distance: r.distance,
          totalEmissions: r.totalEmissions,
          isBaseline: r.isBaseline,
        })
    );
  }

  // Fetch the baseline route
  async findBaseline(): Promise<Route | null> {
    const result = await db.query(`
      SELECT 
        routeid AS "routeId",
        vesseltype AS "vesselType",
        fueltype AS "fuelType",
        year,
        ghgintensity AS "ghgIntensity",
        fuelconsumption AS "fuelConsumption",
        distance,
        totalemissions AS "totalEmissions",
        isbaseline AS "isBaseline"
      FROM "Route"
      WHERE isbaseline = true
      LIMIT 1;
    `);

    const r = result.rows[0];
    return r
      ? new Route({
          id: r.routeId,
          vesselType: r.vesselType,
          fuelType: r.fuelType,
          year: r.year,
          ghgIntensity: r.ghgIntensity,
          fuelConsumption: r.fuelConsumption,
          distance: r.distance,
          totalEmissions: r.totalEmissions,
          isBaseline: r.isBaseline,
        })
      : null;
  }

  // Set a route as the baseline
  async setBaseline(routeId: string): Promise<void> {
    await db.query(`
      UPDATE "Route"
      SET isbaseline = CASE WHEN routeid = $1 THEN true ELSE false END;
    `, [routeId]);
  }
}

