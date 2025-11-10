export class GHGIntensity {
    constructor(private value: number) {
      if (value <= 0) throw new Error("GHG intensity must be positive");
    }
  
    getValue(): number {
      return this.value;
    }
  
    compareTo(other: GHGIntensity): number {
      return ((this.value / other.value) - 1) * 100;
    }
  }
  