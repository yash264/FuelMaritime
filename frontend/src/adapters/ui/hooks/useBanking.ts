import { useEffect, useState } from "react";
import { fetchComplianceBalance } from "../../infrastructure/api/complianceApi";
import { bankSurplus, applySurplus } from "../../infrastructure/api/bankingApi";

interface CBData {
  cb_before: number;
  applied: number;
  cb_after: number;
}

export function useBanking(shipId: string, year: number) {
  const [cb, setCb] = useState<CBData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadCB = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchComplianceBalance(shipId, year);
      setCb(data);
    } catch (err: any) {
      console.error("Error loading compliance balance:", err);
      setError("Unable to fetch compliance balance");
    } finally {
      setLoading(false);
    }
  };

  const bank = async () => {
    await bankSurplus(shipId, year);
    await loadCB();
  };

  const apply = async () => {
    await applySurplus(shipId, year);
    await loadCB();
  };

  useEffect(() => {
    if (shipId) loadCB();
  }, [shipId, year]);

  return { cb, loading, bank, apply, error };
}

