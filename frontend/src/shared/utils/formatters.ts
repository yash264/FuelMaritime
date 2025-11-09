export function formatNumber(value: number, decimals = 2): string {
    return Number(value).toFixed(decimals);
  }
  
  export function formatPercent(value: number): string {
    return `${value.toFixed(2)}%`;
  }
  
  export function formatEmission(value: number): string {
    return `${value.toFixed(2)} t CO₂e`;
  }
  