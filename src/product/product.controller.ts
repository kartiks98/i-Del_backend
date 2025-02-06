import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProduct, SearchFilter, UpdateProduct } from "./product.dto";
import { IPaginationParams } from "src/common/interface";
import { PaginationParamsDecorator, Username } from "src/common/decorators";
import { AnyAuthGuard } from "src/common/anyAuth.guard";

@Controller("products")
@UseGuards(AnyAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("/add-product")
  addProduct(@Username() username: string, @Body() body: CreateProduct) {
    return this.productService.addProduct(username, body);
  }

  @Get(":limit/:pageNumber")
  getProducts(
    @Username() username: string,
    @Query() query: SearchFilter,
    @PaginationParamsDecorator() paginationParams: IPaginationParams
  ) {
    return this.productService.getProducts(username, query, paginationParams);
  }

  @Get(":id")
  getProductnfo(
    @Username() username: string,
    @Param("id") ids: string | string[]
  ) {
    return this.productService.getProductInfo(username, ids);
  }

  @Patch(":id")
  updateProduct(
    @Username() username: string,
    @Param("id") id: string,
    @Body() body: UpdateProduct
  ) {
    return this.productService.updateProduct(username, id, body);
  }

  @Delete(":id")
  removeProduct(@Username() username: string, @Param("id") id: string) {
    return this.productService.removeProduct(username, id);
  }

  @Delete()
  removeAllProducts() {
    return this.productService.removeAllProducts();
  }
}
