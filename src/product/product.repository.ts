import { DataSource, In, Repository } from "typeorm";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ProductEntity } from "./product.entity";
import { CreateProduct, SearchFilter, UpdateProduct } from "./product.dto";
import { IPaginationParams } from "src/common/interface";
import { getPaginationParams } from "src/common/methods";

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(private dataSource: DataSource) {
    super(ProductEntity, dataSource.createEntityManager());
  }

  async addProduct(username: string, body: CreateProduct) {
    const product = this.create({
      ...body,
      userId: username,
    });
    await this.insert(product);
    return product;
  }

  async fetchProducts(
    username: string,
    query: SearchFilter,
    paginationParams: IPaginationParams
  ) {
    const { search } = query;

    const dbQuery = this.createQueryBuilder("product");

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

  async updateProduct(username: string, id: string, body: UpdateProduct) {
    const updatedProduct = await this.update({ id, userId: username }, body);
    if (updatedProduct.affected === 0)
      throw new NotFoundException("Requested ID Not Found");
    return updatedProduct.raw;
  }

  async removeProduct(username: string, id: string) {
    const removedProduct = await this.delete({ id, userId: username });
    if (removedProduct.affected === 0)
      throw new NotFoundException("Requested ID Not Found");
    return removedProduct.raw;
  }
}
