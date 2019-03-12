import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn
} from "typeorm";
import Movies from "./Movies.model";

@Entity("user")
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @Column({ type: "varchar", length: "100", unique: true })
  email: string;

  @Column({ type: "varchar", length: "50", unique: true })
  username: string;

  @Column({ type: "varchar" })
  password: string;

  @Column({ type: "boolean", default: false })
  confirmed: boolean;

  @OneToMany(type => Movies, movies => movies.user)
  @JoinColumn()
  movies: Movies;
}

export default User;
