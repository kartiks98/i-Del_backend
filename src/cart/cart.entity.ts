import { ProductEntity } from "src/product/product.entity";
import { UserEntity } from "src/user/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("carts")
export class CartEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.products)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @ManyToMany(() => ProductEntity, (product) => product.carts)
  @JoinTable({
    name: "cart_product",
    joinColumn: {
      name: "cartId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "productId",
      referencedColumnName: "id",
    },
  })
  products: ProductEntity[];
}
