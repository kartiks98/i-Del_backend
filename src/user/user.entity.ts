import { CartItemEntity } from "src/cart-item/cart-item.entity";
import { DateEntity } from "src/common/entity";
import { OrderEntity } from "src/orders/orders.entity";
import { ProductEntity } from "src/product/product.entity";
import { ProfileEntity } from "src/profile/profile.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from "typeorm";

@Entity("users")
export class UserEntity extends DateEntity {
  @PrimaryColumn({ unique: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @OneToMany(() => OrderEntity, (order) => order.user, {
    cascade: true,
  })
  orders: OrderEntity[];

  @OneToMany(() => ProductEntity, (product) => product.user)
  products: ProductEntity[];

  @OneToMany(() => CartItemEntity, (cartItem) => cartItem.user)
  cartItems: CartItemEntity[];

  @OneToOne(() => ProfileEntity, (profile) => profile.user, { cascade: true })
  profile: ProfileEntity;
}
