import { useEffect, useState } from "react";
import { fetchComparison } from "../../infrastructure/api/routesApi";

interface ComparisonResult {
  routeId: string;
  baseline: number;
  comparison: number;
  percentDiff: number;
  compliant: boolean;
}

export function useCompare() {
  const [data, setData] = useState<ComparisonResult[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComparison().then((res) => {
      setData(res);
      setLoading(false);
    });
  }, []);

  return { data, loading };
}
