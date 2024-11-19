import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CategoryEntity } from "./categories.entity";
import { AddCategory, RenameCategory } from "./categories.dto";
import { getPaginationParams } from "src/common/methods";
import { SearchFilter } from "src/product/product.dto";
import { IPaginationParams } from "src/common/interface";

@Injectable()
export class CategoriesRepository extends Repository<CategoryEntity> {
  constructor(private dataSource: DataSource) {
    super(CategoryEntity, dataSource.createEntityManager());
  }

  async addCategory(body: AddCategory) {
    try {
      const category = this.create(body);
      await this.insert(category);
      return category;
    } catch (er) {
      if (er.code === "23505")
        throw new ConflictException("Category Name Already Exists");
      else throw new InternalServerErrorException();
    }
  }

  async fetchCategories(
    query: SearchFilter,
    paginationParams: IPaginationParams
  ) {
    const { search } = query;

    const dbQuery = this.createQueryBuilder("category");

    dbQuery.orderBy("category.updatedAt", "DESC");

    const { skip, take } = getPaginationParams(paginationParams);
    dbQuery.skip(skip).take(take);

    search &&
      dbQuery.andWhere("(category.name ILIKE :search)", {
        search: `%${search}%`,
      });

    return await dbQuery.getManyAndCount();
  }

  async fetchCategoryInfoByName(name: string) {
    const foundOrder = await this.findOneBy({ name });
    if (!foundOrder) {
      throw new NotFoundException("Category Name Not Found");
    }
    return foundOrder;
  }

  async renameCategory(body: RenameCategory) {
    const { oldName, newName } = body;
    await this.fetchCategoryInfoByName(oldName);
    const updatedCategory = await this.update(
      { name: oldName },
      { name: newName }
    );
    if (updatedCategory.affected === 0)
      throw new NotFoundException("Category Name Not Found");
    return "Successfully updated category name";
  }

  async removeCategory(name: string) {
    const deletedCategory = await this.delete({ name });
    if (deletedCategory.affected === 0)
      throw new NotFoundException("Category Name Not Found");
    return "Successfully deleted category";
  }
}
