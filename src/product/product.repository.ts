import { DataSource, In, Repository } from "typeorm";
import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { ProductEntity } from "./product.entity";
import { CreateProduct, SearchFilter, UpdateProduct } from "./product.dto";
import { IPaginationParams } from "src/common/interface";
import { getPaginationParams } from "src/common/methods";
import { CategoryEntity } from "src/categories/categories.entity";

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(private dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }

  private getCategoryEntityInstancesFromCategoryNames(categories: string[]) {
    const categoryEntities = categories.map((categoryName) => {
      const categoryEntity = new CategoryEntity();
      categoryEntity.name = categoryName;
      return categoryEntity;
    });
    return categoryEntities;
  }

  async addProduct(username: string, body: CreateProduct) {
    const categories = this.getCategoryEntityInstancesFromCategoryNames(
      body.categories
    );
    const product = this.create({
      ...body,
      categories,
      userId: username,
    });
    await this.save(product);
    return product;
  }

  async fetchProducts(
    username: string,
    query: SearchFilter,
    paginationParams: IPaginationParams
  ) {
    const { search } = query;

    const dbQuery = this.createQueryBuilder("product").leftJoinAndSelect(
      "product.categories",
      "category"
    );

    dbQuery.where({ userId: username });

    dbQuery.orderBy("product.updatedAt", "DESC");

    const { skip, take } = getPaginationParams(paginationParams);
    dbQuery.skip(skip).take(take);

    search &&
      dbQuery.andWhere(
        "(product.name ILIKE :search OR product.description ILIKE :search)",
        {
          search: `%${search}%`,
        }
      );
    dbQuery.select([
      "product.createdAt",
      "product.updatedAt",
      "product.id",
      "product.name",
      "product.description",
      "product.availableQuantity",
      "product.userId",
      "product.isSelected",
      "category.name",
    ]);
    return await dbQuery.getManyAndCount();
  }

  async fetchProductInfo(username: string, ids: string | string[]) {
    let foundProduct: any = {};
    if (!Array.isArray(ids))
      foundProduct = await this.findOneBy({ id: ids, userId: username });
    else {
      foundProduct = await this.findBy({ id: In(ids) });
      if (foundProduct.length !== ids.length)
        throw new BadRequestException("Invalid Product IDs");
    }
    if (!foundProduct) {
      throw new NotFoundException("Requested ID Not Found");
    }
    return foundProduct;
  }

  async checkIfProductNotAlreadyExists(username: string, name: string) {
    const foundProduct = await this.findOneBy({ name, userId: username });
    if (!foundProduct) return true;
    throw new BadRequestException("Product Already Exists");
  }

  async updateProduct(
    username: string,
    id: string,
    body: UpdateProduct,
    previousCategories: CategoryEntity[]
  ) {
    const categories = this.getCategoryEntityInstancesFromCategoryNames(
      body.categories || []
    );
    const updatedProduct = await this.save({
      id,
      userId: username,
      ...body,
      categories: categories.length ? categories : previousCategories,
    });
    return updatedProduct;
  }

  async removeProduct(username: string, id: string) {
    const removedProduct = await this.delete({ id, userId: username });
    if (removedProduct.affected === 0)
      throw new NotFoundException("Requested ID Not Found");
    return removedProduct.raw;
  }
}
