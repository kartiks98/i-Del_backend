import { UserEntity } from "src/user/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("cart-item")
export class CartItemEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  productId: string;

  @Column()
  quantity: number;

  @Column({ default: true })
  isSelected: boolean;

  @Column()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.cartItems)
  @JoinColumn({ name: "userId" })
  user: UserEntity;
}
