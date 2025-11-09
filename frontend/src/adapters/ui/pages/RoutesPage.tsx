import RoutesTable from "../components/RoutesTable";
import { useRoutes } from "../hooks/useRoutes";

const RoutesPage = () => {
  const { routes, loading, setBaseline } = useRoutes();

  if (loading) return <div className="p-6">Loading routes...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Routes</h1>
      <RoutesTable routes={routes} onSetBaseline={setBaseline} />
    </div>
  );
};

export default RoutesPage;

