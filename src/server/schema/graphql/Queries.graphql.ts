import gql from "graphql-tag";

export const getUser = gql`
  query GetUser {
    user {
      id
      email
      username
      password
      movies {
        movieId
      }
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
      popularity
      production_companies {
        name
        id
        origin_country
      }
      production_countries {
        iso_3166_1
        name
      }
      revenue
      spoken_languages {
        iso_639_1
        name
      }
      status
      tagline
      vote_average
      vote_count
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

export const getTrendingMovies = gql`
  query GetTrendingMovies {
    trending_movies {
      results {
        id
        poster_path
        backdrop_path
      }
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
