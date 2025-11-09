// Domain entity representing a maritime route
export class Route {
  constructor(
    public readonly routeId: string,
    public vesselType: string,
    public fuelType: string,
    public year: number,
    public ghgIntensity: number,
    public fuelConsumption: number,
    public distance: number,
    public totalEmissions: number
  ) {}

  static fromJSON(data: any): Route {
    return new Route(
      data.routeId,
      data.vesselType,
      data.fuelType,
      data.year,
      data.ghgIntensity,
      data.fuelConsumption,
      data.distance,
      data.totalEmissions
    );
  }

  calculateEfficiency(): number {
    if (this.distance === 0) return 0;
    return this.totalEmissions / this.distance;
  }

  isCompliant(baseline: number): boolean {
    return this.ghgIntensity <= baseline;
  }
}