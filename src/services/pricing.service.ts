export type ProductPricingStatus =
  | "active"
  | "discounted"
  | "critical"
  | "blocked";

export interface PricingInput {
  basePrice: number;
  stock: number;
  criticalStockThreshold: number;
  expirationDate: Date;
  freshnessScore: number;
  minimumPriceMultiplier: number;
  maxPriceMultiplier: number;
}

export interface PricingResult {
  currentPrice: number;
  status: ProductPricingStatus;
}

export class PricingService {
  calculatePrice(input: PricingInput): PricingResult {
    const expirationFactor = this.getExpirationFactor(input.expirationDate);
    const freshnessFactor = this.getFreshnessFactor(input.freshnessScore);

    if (expirationFactor === 0 || freshnessFactor === 0) {
      return {
        currentPrice: 0,
        status: "blocked",
      };
    }

    const stockFactor = this.getStockFactor(
      input.stock,
      input.criticalStockThreshold,
    );

    const calculatedPrice =
      input.basePrice * expirationFactor * freshnessFactor * stockFactor;

    const minimumPrice = input.basePrice * input.minimumPriceMultiplier;

    const maximumPrice = input.basePrice * input.maxPriceMultiplier;

    const currentPrice = Math.round(
      Math.min(Math.max(calculatedPrice, minimumPrice), maximumPrice),
    );

    return {
      currentPrice,
      status: this.getStatus(currentPrice, input.basePrice),
    };
  }

  private getExpirationFactor(expirationDate: Date): number {
    const currentDate = new Date();
    const expiration = new Date(expirationDate);

    const millisecondsPerDay = 1000 * 60 * 60 * 24;

    const remainingDays = Math.ceil(
      (expiration.getTime() - currentDate.getTime()) / millisecondsPerDay,
    );

    if (remainingDays <= 0) {
      return 0;
    }

    if (remainingDays === 1) {
      return 0.55;
    }

    if (remainingDays <= 3) {
      return 0.75;
    }

    if (remainingDays <= 7) {
      return 0.9;
    }

    return 1;
  }

  private getFreshnessFactor(freshnessScore: number): number {
    if (freshnessScore < 20) {
      return 0;
    }

    if (freshnessScore < 40) {
      return 0.6;
    }

    if (freshnessScore < 60) {
      return 0.75;
    }

    if (freshnessScore < 80) {
      return 0.9;
    }

    return 1;
  }

  private getStockFactor(
    stock: number,
    criticalStockThreshold: number,
  ): number {
    if (criticalStockThreshold === 0) {
      return 1;
    }

    if (stock <= criticalStockThreshold / 2) {
      return 1.1;
    }

    if (stock <= criticalStockThreshold) {
      return 1.05;
    }

    return 1;
  }

  private getStatus(
    currentPrice: number,
    basePrice: number,
  ): ProductPricingStatus {
    if (currentPrice <= basePrice * 0.6) {
      return "critical";
    }

    if (currentPrice < basePrice) {
      return "discounted";
    }

    return "active";
  }
}
