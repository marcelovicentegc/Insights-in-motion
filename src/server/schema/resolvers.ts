import * as bcrypt from "bcrypt";
import { IResolvers } from "graphql-tools";
import fetch from "node-fetch";
import { User } from "../database/entities/index";

const TMDB_API_URL = "https://api.themoviedb.org/3";
const resolvers: IResolvers = {
  Query: {
    user: (_, __, { req }) => {
      if (!req.session.userId) {
        return null;
      }

      return User.findOne(req.session.userId);
    },
    users: () => User.find(),
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
    config: (_, __, context) => {
      return fetch(
        `${TMDB_API_URL}/configuration?api_key=${context.secret.API_KEY}`
      ).then(res => res.json());
    }
  },
  Mutation: {
    createUser: async (_, { email, username, password }, { req }) => {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = User.create({
        email: email,
        username: username,
        password: hashedPassword
      });
      await user.save();
      req.session.userId = user.id;
      return user;
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
      console.log(req);
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
    }
  }
};

export default resolvers;
