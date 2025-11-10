export interface IRouteController {
    getAllRoutes(): Promise<any>;
    setBaseline(routeId: string): Promise<void>;
    getComparison(): Promise<any>;
  }
  