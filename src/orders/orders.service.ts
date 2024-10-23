import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderRepository } from "./orders.repository";
import { CreateOrder, FilterQueryParams, UpdateOrder } from "./orders.dto";
import { getUserDetails } from "src/common/methods";
import { IPaginationParams } from "src/common/interface";
import { OrderEntity } from "./orders.entity";
import { ProductService } from "src/product/product.service";

@Injectable()
export class OrdersService {
  constructor(
    private orderRepository: OrderRepository,
    private productService: ProductService,
  ) {}

  async getOrders(
    query: FilterQueryParams,
    accessToken: string,
    paginationParams: IPaginationParams,
    // ): Promise<[OrderEntity[], number]> {
  ): Promise<any> {
    const username = await getUserDetails(accessToken);
    return await this.orderRepository.fetchOrders(
      query,
      username,
      paginationParams,
    );
  }

  async getOrderInfo(id: string, accessToken: string): Promise<OrderEntity> {
    const username = await getUserDetails(accessToken);
    return await this.orderRepository.fetchOrderInfo(id, username);
  }

  async deleteOrder(id: string, accessToken: string): Promise<OrderEntity> {
    const username = await getUserDetails(accessToken);
    return await this.orderRepository.deleteOrder(id, username);
  }

  async updateOrder(
    id: string,
    body: UpdateOrder,
    accessToken: string,
  ): Promise<OrderEntity> {
    const username = await getUserDetails(accessToken);
    return await this.orderRepository.updateOrder(id, body, username);
  }

  async createOrder(
    body: CreateOrder,
    accessToken: string,
  ): Promise<OrderEntity> {
    // productIds & quantities validations
    const { productIds, quantities } = body;
    const products = await this.productService.getProductInfo(
      accessToken,
      productIds,
    );
    const availableQuantities = products.map(
      ({ availableQuantity }, i: number) => {
        if (quantities[i] > availableQuantity)
          throw new BadRequestException(
            "Requested quantity for the product not available",
          );
        return availableQuantity;
      },
    );
    if (productIds.length !== quantities.length)
      throw new BadRequestException("Quantities should be equal to Products");

    const username = await getUserDetails(accessToken);
    return await this.orderRepository.createOrder(
      body,
      username,
      availableQuantities,
    );
  }
}
