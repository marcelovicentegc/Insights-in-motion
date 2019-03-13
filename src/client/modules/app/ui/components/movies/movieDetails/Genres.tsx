import * as React from "react";
import {
  GetMovieGenres,
  GetMovieMovie
} from "../../../../../../__types__/typeDefs";

interface Props {
  movie: GetMovieMovie;
}

const Genres: React.FC<Props> = props => {
  return (
    <div className="movie-genres movie-detail">
      <p>Genres</p>
      {props.movie.genres ? (
        props.movie.genres.map((genre: GetMovieGenres, i: number) => {
          return (
            <p className="movie-genre" key={i}>
              <span>{genre.name}</span>
            </p>
          );
        })
      ) : (
        <p className="movie-genre">
          <span>Undefined</span>
        </p>
      )}
    </div>
  );
};

export default Genres;
