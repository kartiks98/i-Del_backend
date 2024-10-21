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

  @OneToMany(() => OrderEntity, (task) => task.user)
  orders: OrderEntity[];

  @OneToMany(() => ProductEntity, (task) => task.user)
  products: ProductEntity[];
}
