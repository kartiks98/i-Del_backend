import { Module } from "@nestjs/common";
import { CartItemService } from "./cart-item.service";
import { CartItemController } from "./cart-item.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CartItemEntity } from "./cart-item.entity";
import { CartItemRepository } from "./cart-item.repository";
import { ProductModule } from "src/product/product.module";

@Module({
  imports: [TypeOrmModule.forFeature([CartItemEntity]), ProductModule],
  controllers: [CartItemController],
  providers: [CartItemService, CartItemRepository],
})
export class CartItemModule {}
