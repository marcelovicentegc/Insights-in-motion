import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("user")
class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: "100", unique: true })
  email: string;

  @Column({ type: "varchar", length: "50", unique: true })
  username: string;

  @Column({ type: "varchar" })
  password: string;
}

export default User;
