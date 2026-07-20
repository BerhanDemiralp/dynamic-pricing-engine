import { z } from "zod";

export const createProductSchema = z.strictObject({
  name: z.string().trim().min(1, "Product name is required."),
  basePrice: z.number().int().positive("Base price must be a positive number."),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer."),
  criticalStockThreshold: z
    .number()
    .int()
    .nonnegative("Critical stock threshold must be a non-negative integer."),
  expirationDate: z.coerce.date().refine(
    (date) => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      return date.getTime() > today.getTime();
    },
    {
      message: "Expiration date must be in the future.",
    },
  ),
  minimumPriceMultiplier: z
    .number()
    .positive("Minimum price multiplier must be a positive number.")
    .max(1, "Minimum price multiplier must be at most 1."),
  freshnessScore: z
    .number()
    .min(0, "Freshness score must be at least 0.")
    .max(100, "Freshness score must be at most 100."),
  maxPriceMultiplier: z
    .number()
    .min(1, "Max price multiplier must be at least 1."),
});

export const updateProductSchema = createProductSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one product field must be provided.",
  });
