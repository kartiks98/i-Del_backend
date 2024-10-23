import { Injectable } from "@nestjs/common";
import { ProductRepository } from "./product.repository";
import { CreateProduct, SearchFilter, UpdateProduct } from "./product.dto";
import { IPaginationParams } from "src/common/interface";
import { getUserDetails } from "src/common/methods";
import { ProductEntity } from "./product.entity";

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

  async getProductInfo(accessToken: string, ids: string | string[]) {
    const username = await getUserDetails(accessToken);
    return await this.productRepository.fetchProductInfo(username, ids);
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
