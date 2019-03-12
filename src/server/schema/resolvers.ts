import * as bcrypt from "bcrypt";
import { IResolvers } from "graphql-tools";
import fetch from "node-fetch";
import { getConnection } from "typeorm";
import * as yup from "yup";
import { Movies, User } from "../database/entities/index";
import {
  duplicate,
  invalidEmail,
  notLongEnough,
  passwordNotLongEnough
} from "../utils/errorMessages";
import { formatYupError } from "../utils/formatYupErrors";

const schema = yup.object().shape({
  email: yup
    .string()
    .min(3, notLongEnough)
    .max(255)
    .email(invalidEmail),
  username: yup
    .string()
    .min(3, notLongEnough)
    .max(50),
  password: yup
    .string()
    .min(3, passwordNotLongEnough)
    .max(30)
});

const TMDB_API_URL = "https://api.themoviedb.org/3";
const resolvers: IResolvers = {
  Query: {
    user: async (_, __, { req }) => {
      if (!req.session.userId) {
        return null;
      }
      return User.findOne(req.session.userId, { relations: ["movies"] });
    },
    users: async () => User.find(),
    moviesByUser: async (_, __, { req }) => {
      let user = req.session.userId;
      await Movies.createQueryBuilder("movieId")
        .where("movies.userId = :user", {
          userId: user
        })
        .getMany();
      // await User.createQueryBuilder('movies').where('movies.movieId = :movieId', {
      //   movieId:
      // })
    },
    movies: async (_, args, context) => {
      return await fetch(
        `${TMDB_API_URL}/search/movie?api_key=${context.secret.API_KEY}&query=${
          args.query
        }&include_adult=false`
      )
        .then(res => res.json())
        .then(({ results }) => results);
    },
    movie: async (_, args, context) => {
      return await fetch(
        `${TMDB_API_URL}/movie/${args.id}?api_key=${
          context.secret.API_KEY
        }&append_to_response=credits`
      ).then(res => res.json());
    },
    movie_genres: async (_, __, context) => {
      return await fetch(
        `${TMDB_API_URL}/genre/movie/list?api_key=${context.secret.API_KEY}`
      )
        .then(res => res.json())
        .then(({ genres }) => genres);
    },
    config: async (_, __, context) => {
      return fetch(
        `${TMDB_API_URL}/configuration?api_key=${context.secret.API_KEY}`
      ).then(res => res.json());
    }
  },
  Mutation: {
    createUser: async (_, { email, username, password }, { req }) => {
      try {
        await schema.validate(
          { email, username, password },
          { abortEarly: false }
        );
      } catch (error) {
        return formatYupError(error);
      }
      const emailAlreadyExists = await User.findOne({
        where: { email },
        select: ["id"]
      });
      if (emailAlreadyExists) {
        return [
          {
            path: "email",
            message: duplicate
          }
        ];
      }
      const usernameAlreadyExists = await User.findOne({
        where: { username },
        select: ["id"]
      });
      if (usernameAlreadyExists) {
        return [
          {
            path: "username",
            message: duplicate
          }
        ];
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = User.create({
        email: email,
        username: username,
        password: hashedPassword
      });
      await user.save();
      req.session.userId = user.id;
      return null;
    },
    updateUser: async (_, { id, email, username, password }) => {
      try {
        const hashedPassword = await bcrypt.hash(password, 12);
        await User.update(id, {
          email: email,
          username: username,
          password: hashedPassword
        });
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },
    deleteUser: async (_, { id }) => {
      try {
        await User.remove(id);
      } catch (err) {
        console.log(err);
        return false;
      }
      return true;
    },
    loginUser: async (_, { email, password }, { req }) => {
      const user = await User.findOne({
        where: { email }
      });
      if (!user) {
        throw new Error("Such user doesn't exists.");
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Incorrect password.");
      }

      req.session.userId = user.id;
      return user;
    },
    logoutUser: async (_, __, { req, res }) => {
      await new Promise(res => req.session.destroy(() => res()));
      res.clearCookie("connect.sid");
      return true;
    },
    appendMovie: async (_, { movieId, userId }, { req }) => {
      let user = await User.findOne(req.session.userId, {
        relations: ["movies"]
      });
      user.movies.movieId = movieId;
      user.save();
      let movie = new Movies();
      movie.user = userId;
      movie.movieId = movieId;
      console.log(movie);
      await Movies.save(movie);
      return movie;
    },
    dettachMovie: async (_, { movieId }) => {
      try {
        const deleteQuery = getConnection()
          .createQueryBuilder()
          .delete()
          .from(Movies)
          .where("movieId = :movieId", { movieId: movieId });
        await deleteQuery.execute();
      } catch (error) {
        console.log(error);
        return false;
      }
      return true;
    }
  }
};

export default resolvers;
