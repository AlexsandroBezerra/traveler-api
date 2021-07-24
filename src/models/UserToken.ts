import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("user_tokens")
export class UserToken {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column()
  token: string;

  @Column()
  user_id: number;
}
