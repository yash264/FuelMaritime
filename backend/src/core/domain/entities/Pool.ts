export interface PoolMember {
    shipId: string;
    cbBefore: number;
    cbAfter?: number;
  }
  
  export class Pool {
    constructor(
      public id: string,
      public year: number,
      public members: PoolMember[]
    ) {}
  
    get totalCB(): number {
      return this.members.reduce((sum, m) => sum + m.cbBefore, 0);
    }
  
    validate(): boolean {
      return this.totalCB >= 0;
    }
  }
  