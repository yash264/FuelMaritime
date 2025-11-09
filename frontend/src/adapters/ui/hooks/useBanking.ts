import { useEffect, useState } from "react";
import {
  fetchComplianceBalance,
} from "../../infrastructure/api/complianceApi";
import { bankSurplus, applySurplus } from "../../infrastructure/api/bankingApi";

interface CBData {
  cb_before: number;
  applied: number;
  cb_after: number;
}

export function useBanking(year: number) {
  const [cb, setCb] = useState<CBData | null>(null);
  const [loading, setLoading] = useState(true);

  const loadCB = async () => {
    setLoading(true);
    const data = await fetchComplianceBalance(year);
    setCb(data);
    setLoading(false);
  };

  const bank = async () => {
    await bankSurplus();
    loadCB();
  };

  const apply = async () => {
    await applySurplus();
    loadCB();
  };

  useEffect(() => {
    loadCB();
  }, [year]);

  return { cb, loading, bank, apply };
}
