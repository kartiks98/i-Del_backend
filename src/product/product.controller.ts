import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Headers,
  UseGuards,
} from "@nestjs/common";
import { ProductService } from "./product.service";
import { CreateProduct, SearchFilter, UpdateProduct } from "./product.dto";
import { IHeaders, IPaginationParams } from "src/common/interface";
import { PaginationParamsDecorator } from "src/common/decorators";
import { AnyAuthGuard } from "src/common/anyAuth.guard";

@Controller("products")
@UseGuards(AnyAuthGuard)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post("/add-product")
  addProduct(@Headers() headers: IHeaders, @Body() body: CreateProduct) {
    return this.productService.addProduct(headers.authorization, body);
  }

  @Get(":limit/:pageNumber")
  getProducts(
    @Headers() headers: IHeaders,
    @Query() query: SearchFilter,
    @PaginationParamsDecorator() paginationParams: IPaginationParams,
  ) {
    return this.productService.getProducts(
      headers.authorization,
      query,
      paginationParams,
    );
  }

  @Get(":id")
  getProductnfo(@Headers() headers: IHeaders, @Param("id") id: string) {
    return this.productService.getProductnfo(headers.authorization, id);
  }

  @Patch(":id")
  updateProduct(
    @Headers() headers: IHeaders,
    @Param("id") id: string,
    @Body() body: UpdateProduct,
  ) {
    return this.productService.updateProduct(headers.authorization, id, body);
  }

  @Delete(":id")
  removeProduct(@Headers() headers: IHeaders, @Param("id") id: string) {
    return this.productService.removeProduct(headers.authorization, id);
  }
}
