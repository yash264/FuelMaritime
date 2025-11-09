export interface RouteData {
  routeId: string;
  vesselType: string;
  fuelType: string;
  year: number;
  ghgIntensity: number;
  fuelConsumption: number;
  distance: number;
  totalEmissions: number;
}

interface Props {
  routes: RouteData[];
  onSetBaseline: (routeId: string) => void;
}

const RoutesTable = ({ routes, onSetBaseline }: Props) => (
  <div className="overflow-x-auto mt-6">
    <table className="min-w-full border border-gray-300 text-sm">
      <thead className="bg-gray-100">
        <tr>
          {[
            "Route ID",
            "Vessel Type",
            "Fuel Type",
            "Year",
            "GHG Intensity",
            "Fuel (t)",
            "Distance (km)",
            "Emissions (t)",
            "Action",
          ].map((header) => (
            <th key={header} className="border px-3 py-2 text-left">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {routes.map((r) => (
          <tr key={r.routeId} className="border-b hover:bg-gray-50">
            <td className="px-3 py-2">{r.routeId}</td>
            <td className="px-3 py-2">{r.vesselType}</td>
            <td className="px-3 py-2">{r.fuelType}</td>
            <td className="px-3 py-2">{r.year}</td>
            <td className="px-3 py-2">{r.ghgIntensity}</td>
            <td className="px-3 py-2">{r.fuelConsumption}</td>
            <td className="px-3 py-2">{r.distance}</td>
            <td className="px-3 py-2">{r.totalEmissions}</td>
            <td className="px-3 py-2">
              <button
                onClick={() => onSetBaseline(r.routeId)}
                className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
              >
                Set Baseline
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RoutesTable;
