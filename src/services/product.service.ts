import type { CreateProductDto } from "../dto/create-product.dto.js";
import type { Product, ProductCreateData } from "../models/product.model.js";
import { ProductRepository } from "../repositories/product.repository.js";

export class ProductService {
  constructor(private readonly productRepository = new ProductRepository()) {}

  async createProduct(createProductDto: CreateProductDto) {
    const product: ProductCreateData = {
      ...createProductDto,
      currentPrice: createProductDto.basePrice,
      isActive: true,
    };

    return this.productRepository.create(product);
  }

  async getAllProducts() {
    return this.productRepository.findAll();
  }

  async getProductById(id: string) {
    return this.productRepository.findById(id);
  }

  async updateProduct(id: string, product: Partial<Product>) {
    return this.productRepository.updateById(id, product);
  }

  async deleteProduct(id: string) {
    return this.productRepository.deleteById(id);
  }
}
