export interface RouteProps {
    id: string;
    vesselType: string;
    fuelType: string;
    year: number;
    ghgIntensity: number;
    fuelConsumption: number; // tonnes
    distance: number; // km
    totalEmissions: number; // tonnes
    isBaseline?: boolean;
  }
  
  export class Route {
    constructor(private props: RouteProps) {}
  
    get id() { return this.props.id; }
    get vesselType() { return this.props.vesselType; }
    get fuelType() { return this.props.fuelType; }
    get year() { return this.props.year; }
    get ghgIntensity() { return this.props.ghgIntensity; }
    get fuelConsumption() { return this.props.fuelConsumption; }
    get distance() { return this.props.distance; }
    get totalEmissions() { return this.props.totalEmissions; }
    get isBaseline() { return this.props.isBaseline ?? false; }
  
    setBaseline(isBaseline: boolean) {
      this.props.isBaseline = isBaseline;
    }
  }
  