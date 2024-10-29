import { CartEntity } from "src/cart/cart.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("CartItem")
export class CartItemEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  productId: string;

  @Column()
  quantity: number;

  @Column()
  isSelected: boolean;

  @Column()
  cartId: string;

  @ManyToOne(() => CartEntity, (cart) => cart.cartItems)
  @JoinColumn({ name: "cartId" })
  cart: CartEntity;
}
