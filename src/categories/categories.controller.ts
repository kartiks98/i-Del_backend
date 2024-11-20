import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { AddCategory, RenameCategory } from "./categories.dto";
import { PaginationParamsDecorator } from "src/common/decorators";
import { IPaginationParams } from "src/common/interface";
import { AnyAuthGuard } from "src/common/anyAuth.guard";
import { SearchFilter } from "src/product/product.dto";

@Controller("categories")
@UseGuards(AnyAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post("/add")
  create(@Body() body: AddCategory) {
    return this.categoriesService.addCategory(body);
  }

  @Get("/:limit/:pageNumber")
  getCategories(
    @Query() query: SearchFilter,
    @PaginationParamsDecorator() paginationParams: IPaginationParams,
  ) {
    return this.categoriesService.getCategories(query, paginationParams);
  }

  @Patch(":name")
  update(@Body() body: RenameCategory) {
    return this.categoriesService.renameCategory(body);
  }

  @Delete(":name")
  remove(@Param("name") name: string) {
    return this.categoriesService.removeCategory(name);
  }
}
