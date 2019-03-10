import { inject, observer } from "mobx-react";
import * as React from "react";
import { MoviesStore } from "../../../../../stores/Movies.store";
import { GetMovieMovie } from "../../../../../__types__/typeDefs";
import Commentator from "../messages/Commentator";

interface Props {
  movie: GetMovieMovie;
  moviesStore?: MoviesStore;
}

@inject("moviesStore")
@observer
export default class MovieDetail extends React.Component<Props> {
  private handleMovieView = () => {
    this.props.moviesStore.handleMovieView();
  };

  render() {
    return (
      <>
        <Commentator />
        <div className="movie-details">
          <div className="movie-title movie-detail">
            <p>{this.props.movie.title}</p>
          </div>
          <div className="movie-overview movie-detail">
            <p>Overview</p>
            <p>
              <span>{this.props.movie.overview}</span>
            </p>
          </div>
          <div className="movie-genres movie-detail">
            <p>Genres</p>
            {this.props.movie.genres ? (
              this.props.movie.genres.map((genre, i) => {
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
          <div className="movie-budget movie-detail">
            <p>
              <span>
                <b>Budget</b>: $
                {this.props.movie.budget
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </span>
            </p>
          </div>
        </div>
        <div className="button-wrapper">
          <button className="return" onClick={this.handleMovieView}>
            <span> ◀ </span>
          </button>
        </div>
      </>
    );
  }
}
