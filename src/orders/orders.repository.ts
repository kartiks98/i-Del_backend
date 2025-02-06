import { DataSource, Repository } from "typeorm";
import { CreateOrder, FilterQueryParams, UpdateOrder } from "./orders.dto";
import { Injectable, NotFoundException } from "@nestjs/common";
import { IPaginationParams } from "src/common/interface";
import { getPaginationParams } from "src/common/methods";
import { OrderEntity } from "./orders.entity";
import { IOrderStatus } from "./orders.interface";
import { ProductEntity } from "src/product/product.entity";

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  constructor(private dataSource: DataSource) {
    super(OrderEntity, dataSource.createEntityManager());
  }

  private getProductEntityInstancesFromIds(
    body: {
      productIds: string[];
      quantities: number[];
    },
    availableQuantities: number[]
  ) {
    const { productIds, quantities } = body;
    const productsEntities = productIds.map((productId, i) => {
      const productEntity = new ProductEntity();
      productEntity.id = productId;
      productEntity.availableQuantity = availableQuantities[i] - quantities[i];
      return productEntity;
    });
    return productsEntities;
  }

  async fetchOrders(
    query: FilterQueryParams,
    username: string,
    paginationParams: IPaginationParams
  ) {
    const { search, status } = query;

    const dbQuery = this.createQueryBuilder("order");

    dbQuery.where({ userId: username });

    dbQuery.orderBy("order.updatedAt", "DESC");

    const { skip, take } = getPaginationParams(paginationParams);
    dbQuery.skip(skip).take(take);
    dbQuery.leftJoinAndSelect("order.products", "product");

    search &&
      dbQuery.andWhere(
        "(product.name ILIKE :search OR product.description ILIKE :search)",
        {
          search: `%${search}%`,
        }
      );
    status && dbQuery.andWhere("order.status=:status", { status });

    return await dbQuery.getManyAndCount();
  }

  async fetchOrderInfo(id: string, username: string): Promise<OrderEntity> {
    const foundOrder = await this.findOneBy({ id, userId: username });
    if (!foundOrder) {
      throw new NotFoundException("Requested ID Not Found");
    }
    return foundOrder;
  }

  async deleteOrder(id: string, username: string): Promise<OrderEntity> {
    const deletedOrder = await this.delete({ id, userId: username });
    if (deletedOrder.affected === 0)
      throw new NotFoundException("Requested ID Not Found");
    return deletedOrder.raw;
  }

  async deleteAllOrders(): Promise<OrderEntity> {
    const deletedOrder = await this.delete({});
    if (deletedOrder.affected === 0)
      throw new NotFoundException("Requested ID Not Found");
    return deletedOrder.raw;
  }

  async updateOrder(
    id: string,
    body: UpdateOrder,
    username: string
  ): Promise<OrderEntity> {
    const updatedOrder = await this.update({ id, userId: username }, body);
    if (updatedOrder.affected === 0)
      throw new NotFoundException("Requested ID Not Found");
    return updatedOrder.raw;
  }

  async createOrder(
    body: CreateOrder,
    username: string,
    availableQuantities: number[]
  ) {
    const products = this.getProductEntityInstancesFromIds(
      body,
      availableQuantities
    );
    const order = this.create({
      ...body,
      products,
      status: IOrderStatus.PROCESSING,
      userId: username,
    });
    await this.save(order);
    return order;
  }
}
