export type Maybe<T> = T | null;

// ====================================================
// Documents
// ====================================================

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
};

export type GetMovieGenres = {
  __typename?: "Genre";

  id: Maybe<number>;

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
