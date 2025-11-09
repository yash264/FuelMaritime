import { Route } from "../domain/route";

export interface IRoutesRepository {
  fetchAll(): Promise<Route[]>;
  setBaseline(routeId: string): Promise<void>;
  fetchComparison(): Promise<any[]>;
}
