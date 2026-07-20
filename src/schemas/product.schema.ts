import { z } from "zod";

export const createProductSchema = z.strictObject({
  name: z.string().trim().min(1, "Product name is required."),
  basePrice: z.number().int().positive("Base price must be a positive number."),
  stock: z.number().int().nonnegative("Stock must be a non-negative integer."),
  criticalStockThreshold: z
    .number()
    .int()
    .nonnegative("Critical stock threshold must be a non-negative integer."),
  maxPriceMultiplier: z
    .number()
    .min(1, "Max price multiplier must be at least 1."),
});

export const updateProductSchema = createProductSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one product field must be provided.",
  });
