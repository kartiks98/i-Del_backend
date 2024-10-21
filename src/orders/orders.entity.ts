import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "src/user/user.entity";
import { DateEntity } from "src/common/entity";
import { IOrderStatus } from "./orders.interface";
import { ProductEntity } from "src/product/product.entity";

@Entity("orders")
export class OrderEntity extends DateEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  status: IOrderStatus;

  @Column()
  quantity: number;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: "userId" })
  user: UserEntity;

  @ManyToMany(() => ProductEntity, (product) => product.orders)
  @JoinTable({
    name: "order_product",
    joinColumn: {
      name: "orderId",
      referencedColumnName: "id",
    },
    inverseJoinColumn: {
      name: "productId",
      referencedColumnName: "id",
    },
  })
  products: ProductEntity[];
}
