export interface CreateProductDto {
  name: string;
  basePrice: number;
  stock: number;
  criticalStockThreshold: number;
  expirationDate: Date;
  freshnessScore: number;
  minimumPriceMultiplier: number;
  maxPriceMultiplier: number;
}
