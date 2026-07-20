import { Schema, model, type InferSchemaType } from "mongoose";

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    basePrice: {
      type: Number,
      required: true,
      min: 1,
    },

    currentPrice: {
      type: Number,
      default: null,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
    },

    criticalStockThreshold: {
      type: Number,
      required: true,
      min: 0,
    },

    expirationDate: {
      type: Date,
      required: true,
    },

    freshnessScore: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },

    minimumPriceMultiplier: {
      type: Number,
      required: true,
      min: 0,
      max: 1,
      default: 0.5,
    },

    maxPriceMultiplier: {
      type: Number,
      required: true,
      min: 1,
      default: 1.2,
    },

    status: {
      type: String,
      enum: ["active", "discounted", "critical", "blocked"],
      default: "active",
    },
  },
  {
    timestamps: true,
  },
);

export type Product = InferSchemaType<typeof productSchema>;

export type ProductCreateData = Omit<Product, "createdAt" | "updatedAt">;

export const ProductModel = model<Product>("Product", productSchema);
