// Domain model for Compliance Balance (CB)
export class ComplianceBalance {
  constructor(
    public cb_before: number,
    public applied: number,
    public cb_after: number
  ) {}

  static zero(): ComplianceBalance {
    return new ComplianceBalance(0, 0, 0);
  }

  apply(amount: number): ComplianceBalance {
    const applied = Math.min(amount, this.cb_before);
    return new ComplianceBalance(this.cb_before, applied, this.cb_before - applied);
  }

  bank(amount: number): ComplianceBalance {
    return new ComplianceBalance(this.cb_before + amount, 0, this.cb_after + amount);
  }

  isPositive(): boolean {
    return this.cb_after >= 0;
  }
}
