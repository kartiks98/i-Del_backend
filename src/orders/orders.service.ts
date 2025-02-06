import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderRepository } from "./orders.repository";
import { CreateOrder, FilterQueryParams, UpdateOrder } from "./orders.dto";
import { IPaginationParams } from "src/common/interface";
import { OrderEntity } from "./orders.entity";
import { ProductService } from "src/product/product.service";
import { REQ_QNTY_NOT_AVAIL_MSG } from "src/common/constants";

@Injectable()
export class OrdersService {
  constructor(
    private orderRepository: OrderRepository,
    private productService: ProductService
  ) {}

  async getOrders(
    query: FilterQueryParams,
    username: string,
    paginationParams: IPaginationParams
    // ): Promise<[OrderEntity[], number]> {
  ): Promise<any> {
    return await this.orderRepository.fetchOrders(
      query,
      username,
      paginationParams
    );
  }

  async getOrderInfo(id: string, username: string): Promise<OrderEntity> {
    return await this.orderRepository.fetchOrderInfo(id, username);
  }

  async deleteOrder(id: string, username: string): Promise<OrderEntity> {
    return await this.orderRepository.deleteOrder(id, username);
  }

  async deleteAllOrders(): Promise<OrderEntity> {
    return await this.orderRepository.deleteAllOrders();
  }

  async updateOrder(
    id: string,
    body: UpdateOrder,
    username: string
  ): Promise<OrderEntity> {
    return await this.orderRepository.updateOrder(id, body, username);
  }

  async createOrder(body: CreateOrder, username: string): Promise<OrderEntity> {
    // productIds & quantities validations
    const { productIds, quantities } = body;
    const products = await this.productService.getProductInfo(
      username,
      productIds
    );
    const availableQuantities = products.map(
      ({ availableQuantity }, i: number) => {
        if (quantities[i] > availableQuantity)
          throw new BadRequestException(REQ_QNTY_NOT_AVAIL_MSG);
        return availableQuantity;
      }
    );
    if (productIds.length !== quantities.length)
      throw new BadRequestException("Quantities should be equal to Products");

    return await this.orderRepository.createOrder(
      body,
      username,
      availableQuantities
    );
  }
}
