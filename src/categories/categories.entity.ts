import { DateEntity } from "src/common/entity";
import { ProductEntity } from "src/product/product.entity";
import { Entity, JoinTable, ManyToMany, PrimaryColumn } from "typeorm";

@Entity("Category")
export class CategoryEntity extends DateEntity {
  @PrimaryColumn({ unique: true })
  name: string;

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  @JoinTable({
    name: "category_product",
    joinColumn: {
      name: "categoryId",
      referencedColumnName: "name",
    },
    inverseJoinColumn: {
      name: "productId",
      referencedColumnName: "id",
    },
  })
  products: ProductEntity[];
}
