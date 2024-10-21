import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { CreateProduct, SearchFilter, UpdateProduct } from "./product.dto";
import { IPaginationParams } from "src/common/interface";
import { getUserDetails } from "src/common/methods";

@Injectable()
export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async addProduct(accessToken: string, body: CreateProduct) {
    const username = await getUserDetails(accessToken);
    return await this.productRepository.addProduct(username, body);
  }

  async getProducts(
    accessToken: string,
    query: SearchFilter,
    paginationParams: IPaginationParams,
  ) {
    const username = await getUserDetails(accessToken);
    return await this.productRepository.fetchProducts(
      username,
      query,
      paginationParams,
    );
  }

  async getProductnfo(accessToken: string, id: string) {
    const username = await getUserDetails(accessToken);
    return await this.productRepository.fetchProductInfo(username, id);
  }

  async updateProduct(accessToken: string, id: string, body: UpdateProduct) {
    const username = await getUserDetails(accessToken);
    return await this.productRepository.updateProduct(username, id, body);
  }

  async removeProduct(accessToken: string, id: string) {
    const username = await getUserDetails(accessToken);
    return await this.productRepository.removeProduct(username, id);
  }
}
