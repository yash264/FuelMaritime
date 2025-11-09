import { useEffect, useState } from "react";
import { fetchRoutes, setBaseline } from "../../infrastructure/api/routesApi";
import { RouteData } from "../components/RoutesTable";

export function useRoutes() {
  const [routes, setRoutes] = useState<RouteData[]>([]);
  const [loading, setLoading] = useState(true);

  const loadRoutes = async () => {
    setLoading(true);
    const data = await fetchRoutes();
    setRoutes(data);
    setLoading(false);
  };

  const handleSetBaseline = async (routeId: string) => {
    await setBaseline(routeId);
    loadRoutes();
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  return { routes, loading, setBaseline: handleSetBaseline };
}
