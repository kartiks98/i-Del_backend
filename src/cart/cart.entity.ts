import { CartItemEntity } from "src/cart-item/cart-item.entity";
import { ProductEntity } from "src/product/product.entity";
import { UserEntity } from "src/user/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.cart)
  cartItems: CartItemEntity[];
}
