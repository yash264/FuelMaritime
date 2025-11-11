import { useEffect, useState } from "react";
import { fetchAdjustedCB } from "../../infrastructure/api/complianceApi";
import { createPool } from "../../infrastructure/api/poolingApi";

interface PoolMember {
  shipId: string;
  cb_before: number;
  cb_after?: number;
}

export function usePooling(year: number) {
  const [members, setMembers] = useState<PoolMember[]>([]);
  const [loading, setLoading] = useState(true);

  // const loadMembers = async () => {
  //   const data = await fetchAdjustedCB(year,shipId);
  //   setMembers(data);
  //   setLoading(false);
  // };

  const handleCreatePool = async () => {
    const result = await createPool({ members, year });
    setMembers(result);
  };

  useEffect(() => {
    // loadMembers();
  }, [year]);

  const poolSum = members.reduce(
    (sum, m) => sum + (m.cb_after ?? m.cb_before),
    0
  );

  const valid = poolSum >= 0;

  return { members, loading, createPool: handleCreatePool, poolSum, valid };
}
