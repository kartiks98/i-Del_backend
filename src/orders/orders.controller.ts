import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrder, FilterQueryParams, UpdateOrder } from "./orders.dto";
import { IHeaders, IPaginationParams } from "src/common/interface";
import { PaginationParamsDecorator } from "src/common/decorators";
import { OrderEntity } from "./orders.entity";
import { AnyAuthGuard } from "src/common/anyAuth.guard";

@Controller("orders")
@UseGuards(AnyAuthGuard)
export class TasksController {
  constructor(private ordersService: OrdersService) {}

  @Get(":limit/:pageNumber")
  getOrders(
    @Headers() headers: IHeaders,
    @Query() query: FilterQueryParams,
    @PaginationParamsDecorator() paginationParams: IPaginationParams,
  ): Promise<[OrderEntity[], number]> {
    return this.ordersService.getOrders(
      query,
      headers.authorization,
      paginationParams,
    );
  }

  @Get("/:id")
  getOrderInfo(
    @Headers() headers: IHeaders,
    @Param("id") id: string,
  ): Promise<OrderEntity> {
    return this.ordersService.getOrderInfo(id, headers.authorization);
  }

  @Delete("/:id")
  deleteOrder(
    @Headers() headers: IHeaders,
    @Param("id") id: string,
  ): Promise<OrderEntity> {
    return this.ordersService.deleteOrder(id, headers.authorization);
  }

  @Patch("/:id")
  updateOrder(
    @Headers() headers: IHeaders,
    @Param("id") id: string,
    @Body() body: UpdateOrder,
  ): Promise<OrderEntity> {
    return this.ordersService.updateOrder(id, body, headers.authorization);
  }

  @Post("/create-order")
  createOrder(
    @Headers() headers: IHeaders,
    @Body() body: CreateOrder,
  ): Promise<OrderEntity> {
    return this.ordersService.createOrder(body, headers.authorization);
  }
}
