import { CartEntity } from "src/cart/cart.entity";
import { DateEntity } from "src/common/entity";
import { OrderEntity } from "src/orders/orders.entity";
import { UserEntity } from "src/user/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("products")
export class ProductEntity extends DateEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  availableQuantity: number;

  @Column()
  userId: string;

  @Column({ nullable: true })
  isSelected: boolean;

  @ManyToOne(() => UserEntity, (user) => user.products)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @ManyToMany(() => OrderEntity, (order) => order.products, {
    cascade: true,
    onDelete: "CASCADE",
  })
  orders?: OrderEntity[];

  @ManyToMany(() => CartEntity, (cart) => cart.products)
  carts: CartEntity[];

  // @ManyToOne(() => OrderEntity, (order) => order.products)
  // @JoinColumn({ name: "orderId" })
  // order?: OrderEntity;
}
