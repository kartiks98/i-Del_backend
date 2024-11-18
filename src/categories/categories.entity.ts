import { DateEntity } from "src/common/entity";
import { ProductEntity } from "src/product/product.entity";
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("Category")
export class CategoryEntity extends DateEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => ProductEntity, (product) => product.categories)
  @JoinTable({
    name: "category_product",
    joinColumn: {
      name: "categoryId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "productId",
      referencedColumnName: "id",
    },
  })
  products: ProductEntity[];
}
