import { IResolvers } from "graphql-tools";
import fetch from "node-fetch";

const TMDB_API_URL = "https://api.themoviedb.org/3";
const resolvers: IResolvers = {
  Query: {
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
    }
  }
};

export default resolvers;
