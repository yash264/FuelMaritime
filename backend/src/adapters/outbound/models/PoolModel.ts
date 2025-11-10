export interface PoolModel {
    id: string;
    year: number;
    created_at: Date;
  }
  
  export interface PoolMemberModel {
    pool_id: string;
    ship_id: string;
    cb_before: number;
    cb_after: number;
  }
  