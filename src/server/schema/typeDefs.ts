import gql from "graphql-tag";

const typeDefs = gql`
  scalar Upload

  type Query {
    users: [User!]!
    user: User!
    movies(query: String!): [Movie]
    movie(id: Int!): Movie
    movie_genres: [Genre]
    config: Config
  }

  type User {
    id: Int!
    email: String!
    avatar: Upload
    username: String!
    password: String!
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

  type Mutation {
    createUser(
      email: String!
      username: String!
      password: String!
      avatar: Upload
    ): User!
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
  }
`;

export default typeDefs;
