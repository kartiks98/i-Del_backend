import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrder, FilterQueryParams, UpdateOrder } from "./orders.dto";
import { IPaginationParams } from "src/common/interface";
import { PaginationParamsDecorator, Username } from "src/common/decorators";
import { OrderEntity } from "./orders.entity";
import { AnyAuthGuard } from "src/common/anyAuth.guard";

@Controller("orders")
@UseGuards(AnyAuthGuard)
export class TasksController {
  constructor(private ordersService: OrdersService) {}

  @Get(":limit/:pageNumber")
  getOrders(
    @Username() username: string,
    @Query() query: FilterQueryParams,
    @PaginationParamsDecorator() paginationParams: IPaginationParams
  ): Promise<[OrderEntity[], number]> {
    return this.ordersService.getOrders(query, username, paginationParams);
  }

  @Get("/:id")
  getOrderInfo(
    @Username() username: string,
    @Param("id") id: string
  ): Promise<OrderEntity> {
    return this.ordersService.getOrderInfo(id, username);
  }

  @Delete("/:id")
  deleteOrder(
    @Username() username: string,
    @Param("id") id: string
  ): Promise<OrderEntity> {
    return this.ordersService.deleteOrder(id, username);
  }

  @Delete()
  deleteAllOrders(): Promise<OrderEntity> {
    return this.ordersService.deleteAllOrders();
  }

  @Patch("/:id")
  updateOrder(
    @Username() username: string,
    @Param("id") id: string,
    @Body() body: UpdateOrder
  ): Promise<OrderEntity> {
    return this.ordersService.updateOrder(id, body, username);
  }

  @Post("/create-order")
  createOrder(
    @Username() username: string,
    @Body() body: CreateOrder
  ): Promise<OrderEntity> {
    return this.ordersService.createOrder(body, username);
  }
}
