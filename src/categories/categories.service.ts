import { Injectable } from "@nestjs/common";
import { AddCategory, RenameCategory } from "./categories.dto";

@Injectable()
export class CategoriesService {
  addCategory(body: AddCategory) {
    return "This action adds a new category";
  }

  getCategories() {
    return `This action returns all categories`;
  }

  renameCategory(id: string, body: RenameCategory) {
    return `This action updates a #${id} category`;
  }

  removeCategory(id: string) {
    return `This action removes a #${id} category`;
  }
}
