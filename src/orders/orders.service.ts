import { BadRequestException, Injectable } from "@nestjs/common";
import { OrderRepository } from "./orders.repository";
import { CreateOrder, FilterQueryParams, UpdateOrder } from "./orders.dto";
import { getUserDetails } from "src/common/methods";
import { IPaginationParams } from "src/common/interface";
import { OrderEntity } from "./orders.entity";

@Injectable()
export class OrdersService {
  constructor(private orderRepository: OrderRepository) {}

  async getOrders(
    query: FilterQueryParams,
    accessToken: string,
    paginationParams: IPaginationParams
    // ): Promise<[OrderEntity[], number]> {
  ): Promise<any> {
    const username = await getUserDetails(accessToken);
    return await this.orderRepository.fetchOrders(
      query,
      username,
      paginationParams
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
    accessToken: string
  ): Promise<OrderEntity> {
    const username = await getUserDetails(accessToken);
    return await this.orderRepository.updateOrder(id, body, username);
  }

  async createOrder(
    body: CreateOrder,
    accessToken: string
  ): Promise<OrderEntity> {
    const username = await getUserDetails(accessToken);
    const { productIds, quantities } = body;
    if (productIds.length !== quantities.length)
      throw new BadRequestException("Quantities should be equal to Products");
    return await this.orderRepository.createOrder(body, username);
  }
}
