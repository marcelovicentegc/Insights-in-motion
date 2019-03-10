import gql from "graphql-tag";

export const getUser = gql`
  query GetUser {
    user {
      id
      email
      username
      password
    }
  }
`;

export const getMovies = gql`
  query GetMovies($query: String!) {
    movies(query: $query) {
      id
      title
      poster_path
      overview
      backdrop_path
      budget
      genres {
        id
        name
      }
      release_date
    }
  }
`;

export const getMovie = gql`
  query GetMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      poster_path
      overview
      backdrop_path
      budget
      genres {
        id
        name
      }
      release_date
    }
  }
`;

export const getMovieGenres = gql`
  query GetMovieGenres {
    movie_genres {
      id
      name
    }
  }
`;

export const getConfig = gql`
  query GetConfig {
    config {
      images {
        poster_sizes
        base_url
        secure_base_url
      }
    }
  }
`;
