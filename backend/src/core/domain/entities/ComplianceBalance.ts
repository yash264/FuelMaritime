export class ComplianceBalance {
    constructor(
      public shipId: string,
      public year: number,
      public cbGCO2eq: number
    ) {}
  
    isSurplus(): boolean {
      return this.cbGCO2eq > 0;
    }
  
    isDeficit(): boolean {
      return this.cbGCO2eq < 0;
    }
  }
  