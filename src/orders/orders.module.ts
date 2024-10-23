import { Module } from "@nestjs/common";
import { TasksController } from "./orders.controller";
import { OrdersService } from "./orders.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderRepository } from "./orders.repository";
import { OrderEntity } from "./orders.entity";
import { ProductModule } from "src/product/product.module";

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity]), ProductModule],
  controllers: [TasksController],
  providers: [OrdersService, OrderRepository],
})
export class TasksModule {}
