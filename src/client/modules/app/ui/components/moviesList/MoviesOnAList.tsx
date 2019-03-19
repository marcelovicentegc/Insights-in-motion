import { inject, observer } from "mobx-react";
import * as React from "react";
import { MoviesStore } from "../../../../../stores/Movies.store";
import { GetMoviesQuery, GetUserUser } from "../../../../../__types__/typeDefs";
import NumberOfResults from "../messages/NumberOfResults";
import AddOrRemoveMovieWrapper from "../movieDetails/buttons/AddOrRemoveMovieWrapper";

interface Props {
  moviesStore?: MoviesStore;
  data: GetMoviesQuery;
  user: GetUserUser;
  userMovies?: Array<number> | null;
  withALoggedInUser: boolean;
}

@inject("moviesStore")
@observer
export default class MoviesOnAList extends React.Component<Props> {
  private handleMovieView = () => {
    this.props.moviesStore.handleMovieView();
  };

  render() {
    return (
      <>
        <NumberOfResults results={this.props.data.movies.length} />
        <div className="movies-list">
          {this.props.data.movies.map((movie, i) => {
            return (
              <ul key={i} className="movie">
                <li>
                  <h4
                    onClick={e => {
                      this.props.moviesStore.selectedMovie = movie.id;
                      this.handleMovieView();
                    }}
                  >
                    {movie.title}
                  </h4>
                  {this.props.withALoggedInUser ? (
                    <AddOrRemoveMovieWrapper
                      userMovies={this.props.userMovies}
                      user={this.props.user}
                      movie={movie}
                    />
                  ) : null}
                </li>
              </ul>
            );
          })}
        </div>
      </>
    );
  }
}
