import { Route } from "../../domain/entities/Routes.js";

export interface IRouteRepository {
  findAll(): Promise<Route[]>;
  findBaseline(): Promise<Route | null>;
  setBaseline(id: string): Promise<void>;
}
