import { Injectable } from "@nestjs/common";
import { AddCategory, RenameCategory } from "./categories.dto";
import { CategoriesRepository } from "./categories.repository";
import { SearchFilter } from "src/product/product.dto";
import { IPaginationParams } from "src/common/interface";

@Injectable()
export class CategoriesService {
  constructor(private categoriesRepository: CategoriesRepository) {}

  async addCategory(body: AddCategory) {
    return await this.categoriesRepository.addCategory(body);
  }

  async getCategories(
    query: SearchFilter,
    paginationParams: IPaginationParams,
  ) {
    return await this.categoriesRepository.fetchCategories(
      query,
      paginationParams,
    );
  }

  async renameCategory(body: RenameCategory) {
    return await this.categoriesRepository.renameCategory(body);
  }

  async removeCategory(name: string) {
    return await this.categoriesRepository.removeCategory(name);
  }
}
