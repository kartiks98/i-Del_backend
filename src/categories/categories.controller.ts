import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { AddCategory, RenameCategory } from "./categories.dto";
import { PaginationParamsDecorator, Username } from "src/common/decorators";
import { IPaginationParams } from "src/common/interface";
import { AnyAuthGuard } from "src/common/anyAuth.guard";

@Controller("categories")
@UseGuards(AnyAuthGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  create(@Body() body: AddCategory) {
    return this.categoriesService.addCategory(body);
  }

  @Get("/list/:limit/:pageNumber")
  getCategories(
    @Username() username,
    @PaginationParamsDecorator() paginationParams: IPaginationParams
  ) {
    return this.categoriesService.getCategories();
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() body: RenameCategory) {
    return this.categoriesService.renameCategory(id, body);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.categoriesService.removeCategory(id);
  }
}
