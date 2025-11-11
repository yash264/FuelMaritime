import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
    toast.loading("Setting baseline...");

    try {
      await setBaseline(routeId);
      toast.dismiss(); // remove loading toast
      toast.success(`Baseline set successfully for route ${routeId}!`);
      await loadRoutes();
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to set baseline. Please try again.");
      console.error(error);
    }
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  return { routes, loading, setBaseline: handleSetBaseline };
}

