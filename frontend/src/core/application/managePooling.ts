export interface PoolMember {
    shipId: string;
    cb_before: number;
    cb_after?: number;
  }
  
  export interface PoolResult {
    members: PoolMember[];
    total: number;
    valid: boolean;
  }
  
  export function createPool(members: PoolMember[]): PoolResult {
    const total = members.reduce((sum, m) => sum + m.cb_before, 0);
    const valid = total >= 0;
  
    // Simple reallocation logic
    const sorted = [...members].sort((a, b) => b.cb_before - a.cb_before);
  
    let remainingSurplus = sorted.filter(m => m.cb_before > 0).reduce((s, m) => s + m.cb_before, 0);
    const deficits = sorted.filter(m => m.cb_before < 0);
  
    for (const d of deficits) {
      const need = Math.abs(d.cb_before);
      const apply = Math.min(remainingSurplus, need);
      d.cb_after = d.cb_before + apply;
      remainingSurplus -= apply;
    }
  
    const withAfter = sorted.map(m => ({
      ...m,
      cb_after: m.cb_after ?? m.cb_before,
    }));
  
    return { members: withAfter, total, valid };
  }
  