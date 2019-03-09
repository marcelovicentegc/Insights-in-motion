import gql from "graphql-tag";

const typeDefs = gql`
  type Query {
    movies(query: String!): [Movie]
    movie(id: Int!): Movie
    movie_genres: [Genre]
  }

  type Genre {
    id: Int
    name: String
  }

  type Movie {
    id: Int
    title: String
    poster_path: String
    overview: String
    backdrop_path: String
    budget: Int
    genres: [Genre]
    genre_ids: [Int]
    release_date: String
  }
`;

export default typeDefs;
