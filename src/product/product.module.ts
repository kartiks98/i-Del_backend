import { Module } from "@nestjs/common";
import { ProductService } from "./product.service";
import { ProductController } from "./product.controller";
import { ProductRepository } from "./product.repository";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ProductEntity } from "./product.entity";
import { CategoriesModule } from "src/categories/categories.module";

@Module({
  imports: [TypeOrmModule.forFeature([ProductEntity]), CategoriesModule],
  controllers: [ProductController],
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
})
export class ProductModule {}
