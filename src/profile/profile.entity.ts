import { UserEntity } from "src/user/user.entity";
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity("profile")
export class ProfileEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  isSubscribed: boolean;

  // @Column()
  // wishlistItems: string[];

  @Column()
  userId: string;

  @OneToOne(() => UserEntity, (user) => user.username)
  @JoinColumn({ name: "userId" })
  user: UserEntity;
}
