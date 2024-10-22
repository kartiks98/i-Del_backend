import { DateEntity } from "src/common/entity";
import { OrderEntity } from "src/orders/orders.entity";
import { ProductEntity } from "src/product/product.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

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
}
