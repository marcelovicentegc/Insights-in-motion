export type Maybe<T> = T | null;

export type Upload = any;

// ====================================================
// Documents
// ====================================================

export type CreateUserVariables = {
  email: string;
  username: string;
  password: string;
  avatar?: Maybe<Upload>;
};

export type CreateUserMutation = {
  __typename?: "Mutation";

  createUser: Maybe<CreateUserCreateUser[]>;
};

export type CreateUserCreateUser = {
  __typename?: "Error";

  path: string;

  message: string;
};

export type UpdateUserVariables = {
  id: string;
  email?: Maybe<string>;
  username?: Maybe<string>;
  password?: Maybe<string>;
  avatar?: Maybe<Upload>;
};

export type UpdateUserMutation = {
  __typename?: "Mutation";

  updateUser: boolean;
};

export type DeleteUserVariables = {
  id: string;
};

export type DeleteUserMutation = {
  __typename?: "Mutation";

  deleteUser: boolean;
};

export type LoginUserVariables = {
  email: string;
  password: string;
};

export type LoginUserMutation = {
  __typename?: "Mutation";

  loginUser: LoginUserLoginUser;
};

export type LoginUserLoginUser = {
  __typename?: "User";

  email: string;
};

export type LogoutUserVariables = {};

export type LogoutUserMutation = {
  __typename?: "Mutation";

  logoutUser: boolean;
};

export type AppendMovieVariables = {
  movieId?: Maybe<number>;
  userId?: Maybe<string>;
};

export type AppendMovieMutation = {
  __typename?: "Mutation";

  appendMovie: Maybe<AppendMovieAppendMovie>;
};

export type AppendMovieAppendMovie = {
  __typename?: "UserMovies";

  movieId: Maybe<number>;

  userId: Maybe<string>;
};

export type DettachMovieVariables = {
  movieId?: Maybe<number>;
};

export type DettachMovieMutation = {
  __typename?: "Mutation";

  dettachMovie: boolean;
};

export type GetUserVariables = {};

export type GetUserQuery = {
  __typename?: "Query";

  user: GetUserUser;
};

export type GetUserUser = {
  __typename?: "User";

  id: string;

  email: string;

  username: string;

  password: string;

  movies: Maybe<(Maybe<GetUserMovies>)[]>;
};

export type GetUserMovies = {
  __typename?: "UserMovies";

  movieId: Maybe<number>;
};

export type GetMoviesVariables = {
  query: string;
};

export type GetMoviesQuery = {
  __typename?: "Query";

  movies: Maybe<(Maybe<GetMoviesMovies>)[]>;
};

export type GetMoviesMovies = {
  __typename?: "Movie";

  id: Maybe<number>;

  title: Maybe<string>;

  poster_path: Maybe<string>;

  overview: Maybe<string>;

  backdrop_path: Maybe<string>;

  budget: Maybe<number>;

  genres: Maybe<(Maybe<GetMoviesGenres>)[]>;

  release_date: Maybe<string>;
};

export type GetMoviesGenres = {
  __typename?: "Genre";

  id: Maybe<number>;

  name: Maybe<string>;
};

export type GetMovieVariables = {
  id: number;
};

export type GetMovieQuery = {
  __typename?: "Query";

  movie: Maybe<GetMovieMovie>;
};

export type GetMovieMovie = {
  __typename?: "Movie";

  id: Maybe<number>;

  title: Maybe<string>;

  poster_path: Maybe<string>;

  overview: Maybe<string>;

  backdrop_path: Maybe<string>;

  budget: Maybe<number>;

  genres: Maybe<(Maybe<GetMovieGenres>)[]>;

  release_date: Maybe<string>;

  popularity: Maybe<string>;

  production_companies: Maybe<(Maybe<GetMovieProductionCompanies>)[]>;

  production_countries: Maybe<(Maybe<GetMovieProductionCountries>)[]>;

  revenue: Maybe<number>;

  spoken_languages: Maybe<(Maybe<GetMovieSpokenLanguages>)[]>;

  status: Maybe<string>;

  tagline: Maybe<string>;

  vote_average: Maybe<string>;

  vote_count: Maybe<number>;
};

export type GetMovieGenres = {
  __typename?: "Genre";

  id: Maybe<number>;

  name: Maybe<string>;
};

export type GetMovieProductionCompanies = {
  __typename?: "ProductionCompanies";

  name: Maybe<string>;

  id: Maybe<number>;

  origin_country: Maybe<string>;
};

export type GetMovieProductionCountries = {
  __typename?: "ProductionCountries";

  iso_3166_1: Maybe<string>;

  name: Maybe<string>;
};

export type GetMovieSpokenLanguages = {
  __typename?: "SpokenLanguages";

  iso_639_1: Maybe<string>;

  name: Maybe<string>;
};

export type GetMovieGenresVariables = {};

export type GetMovieGenresQuery = {
  __typename?: "Query";

  movie_genres: Maybe<(Maybe<GetMovieGenresMovieGenres>)[]>;
};

export type GetMovieGenresMovieGenres = {
  __typename?: "Genre";

  id: Maybe<number>;

  name: Maybe<string>;
};

export type GetTrendingMoviesVariables = {};

export type GetTrendingMoviesQuery = {
  __typename?: "Query";

  trending_movies: Maybe<GetTrendingMoviesTrendingMovies>;
};

export type GetTrendingMoviesTrendingMovies = {
  __typename?: "TrendingMovies";

  results: Maybe<(Maybe<GetTrendingMoviesResults>)[]>;
};

export type GetTrendingMoviesResults = {
  __typename?: "TrendingMovie";

  id: Maybe<number>;

  poster_path: Maybe<string>;

  backdrop_path: Maybe<string>;
};

export type GetConfigVariables = {};

export type GetConfigQuery = {
  __typename?: "Query";

  config: Maybe<GetConfigConfig>;
};

export type GetConfigConfig = {
  __typename?: "Config";

  images: Maybe<GetConfigImages>;
};

export type GetConfigImages = {
  __typename?: "Images";

  poster_sizes: Maybe<(Maybe<string>)[]>;

  base_url: Maybe<string>;

  secure_base_url: Maybe<string>;
};
