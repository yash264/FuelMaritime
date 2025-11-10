export function validatePositiveNumber(value: number, field: string): void {
    if (value <= 0 || Number.isNaN(value)) {
      throw new Error(`${field} must be a positive number`);
    }
  }
  
  export function validateYear(year: number): void {
    if (year < 2000 || year > 2100) {
      throw new Error("Invalid year");
    }
  }
  