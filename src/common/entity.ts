import { CreateDateColumn, Entity, UpdateDateColumn } from "typeorm";

@Entity("date")
export class DateEntity {
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
