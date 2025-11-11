import { IRouteRepository } from "../../../core/ports/outbound/IRouteRepository.js";
import { Route } from "../../../core/domain/entities/Routes.js";
import { db } from "../../../infrastructure/db/connection.js";

export class RouteRepository implements IRouteRepository {
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
      FROM "route"
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
      FROM "route"
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

  async setBaseline(id: string): Promise<void> {
    const client = await db.connect();
    try {
      await client.query("BEGIN");

      // 🔹 Use lowercase table name
      await client.query(`UPDATE "route" SET isbaseline = false;`);
      await client.query(`UPDATE "route" SET isbaseline = true WHERE routeid = $1;`, [id]);

      await client.query("COMMIT");
      console.log(`✅ Baseline route set to ${id}`);
    } catch (err) {
      await client.query("ROLLBACK");
      console.error("❌ Failed to set baseline:", err);
      throw err;
    } finally {
      client.release();
    }
  }
}
