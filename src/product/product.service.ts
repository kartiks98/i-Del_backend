import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { CreateProduct, SearchFilter, UpdateProduct } from "./product.dto";
import { IPaginationParams } from "src/common/interface";
import { CategoriesRepository } from "src/categories/categories.repository";

@Injectable()
export class ProductService {
  constructor(
    private productRepository: ProductRepository,
    private categoriesRepository: CategoriesRepository
  ) {}

  async addProduct(username: string, body: CreateProduct) {
    const isProductAlreadyNotExists =
      await this.productRepository.checkIfProductNotAlreadyExists(
        username,
        body.name
      );
    if (isProductAlreadyNotExists) {
      await this.categoriesRepository.fetchCategoryInfoByName(body.categories);
      return await this.productRepository.addProduct(username, body);
    }
  }

  async getProducts(
    username: string,
    query: SearchFilter,
    paginationParams: IPaginationParams
  ) {
    return await this.productRepository.fetchProducts(
      username,
      query,
      paginationParams
    );
  }

  async getProductInfo(username: string, ids: string | string[]) {
    return await this.productRepository.fetchProductInfo(username, ids);
  }

  async updateProduct(username: string, id: string, body: UpdateProduct) {
    const previousCategories =
      await this.categoriesRepository.fetchCategoryInfoByName(body.categories);

    return await this.productRepository.updateProduct(
      username,
      id,
      body,
      previousCategories
    );
  }

  async removeProduct(username: string, id: string) {
    return await this.productRepository.removeProduct(username, id);
  }
}
