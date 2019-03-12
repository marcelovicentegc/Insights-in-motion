import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn
} from "typeorm";
import User from "./User.model";

@Entity("movie")
class Movie extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: number;

  @ManyToOne(type => User, user => user.movies)
  @JoinColumn()
  user: User;

  @Column({ nullable: true })
  movieId: number;
}

export default Movie;
