import { UserEntity } from "src/user/user.entity";
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
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.cartItems)
  @JoinColumn({ name: "userId" })
  user: UserEntity;
}
