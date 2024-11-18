import { Injectable } from "@nestjs/common";
import { DataSource, Repository } from "typeorm";
import { CategoryEntity } from "./categories.entity";

@Injectable()
export class CategoriesRepository extends Repository<CategoryEntity> {
  constructor(private dataSource: DataSource) {
    super(CategoryEntity, dataSource.createEntityManager());
  }
}
