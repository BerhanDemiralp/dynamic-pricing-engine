import { Schema, model, type InferSchemaType } from "mongoose";

export type ProductCreateData = Omit<Product, "createdAt" | "updatedAt">;

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120,
    },

    basePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    currentPrice: {
      type: Number,
      required: true,
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

    maxPriceMultiplier: {
      type: Number,
      required: true,
      min: 1,
      default: 1.5,
    },

    isActive: {
      type: Boolean,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

export type Product = InferSchemaType<typeof productSchema>;

export const ProductModel = model<Product>("Product", productSchema);
