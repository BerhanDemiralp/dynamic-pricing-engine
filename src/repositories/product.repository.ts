import {
  ProductModel,
  type Product,
  type ProductCreateData,
} from "../models/product.model.js";

export class ProductRepository {
  async create(product: ProductCreateData) {
    return ProductModel.create(product);
  }

  async findAll() {
    return ProductModel.find();
  }

  async findById(id: string) {
    return ProductModel.findById(id);
  }

  async updateById(id: string, product: Partial<Product>) {
    return ProductModel.findByIdAndUpdate(id, product, {
      returnDocument: "after",
      runValidators: true,
    });
  }

  async deleteById(id: string) {
    return ProductModel.findByIdAndDelete(id);
  }
}
