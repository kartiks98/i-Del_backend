import { Module } from "@nestjs/common";
import { CartItemService } from "./cart-item.service";
import { CartItemController } from "./cart-item.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItemEntity } from "./cart-item.entity";
import { CartItemRepository } from "./cart-item.repository";

@Module({
  imports: [TypeOrmModule.forFeature([CartItemEntity])],
  controllers: [CartItemController],
  providers: [CartItemService, CartItemRepository],
})
export class CartItemModule {}
