export interface CreateProductDto {
  name: string;
  basePrice: number;
  stock: number;
  criticalStockThreshold: number;
  maxPriceMultiplier: number;
}
