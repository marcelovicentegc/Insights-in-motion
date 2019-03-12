import gql from "graphql-tag";

const typeDefs = gql`
  scalar Upload

  type User {
    id: String!
    email: String!
    avatar: Upload
    username: String!
    password: String!
    movies: [UserMovies]
  }

  type UserMovies {
    movieId: Int
    userId: String
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

  type Images {
    poster_sizes: [String]
    base_url: String
    secure_base_url: String
  }

  type Config {
    images: Images
  }

  type DiscoverMovie {
    id: Int
    title: String
    poster_path: String
    backdrop_path: String
    popularity: Int
  }

  type Query {
    users: [User!]!
    user: User!
    moviesByUser: [UserMovies]
    movies(query: String!): [Movie]
    movie(id: Int!): Movie
    movie_genres: [Genre]
    config: Config
  }

  type Error {
    path: String!
    message: String!
  }

  type Mutation {
    createUser(
      email: String!
      username: String!
      password: String!
      avatar: Upload
    ): [Error!]
    updateUser(
      id: ID!
      username: String
      email: String
      password: String
      avatar: Upload
    ): Boolean!
    deleteUser(id: ID!): Boolean!
    loginUser(email: String!, password: String!): User!
    logoutUser: Boolean!
    appendMovie(movieId: Int, userId: String): UserMovies
    dettachMovie(movieId: Int): Boolean!
  }
`;

export default typeDefs;
