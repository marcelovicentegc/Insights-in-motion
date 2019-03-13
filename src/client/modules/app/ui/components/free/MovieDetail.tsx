import { inject, observer } from "mobx-react";
import * as React from "react";
import { MoviesStore } from "../../../../../stores/Movies.store";
import { GetMovieMovie } from "../../../../../__types__/typeDefs";
import CashFlow from "./moveDetails/CashFlow";
import Genres from "./moveDetails/Genres";
import Overview from "./moveDetails/Overview";
import ReleaseDate from "./moveDetails/ReleaseDate";
import ReturnButton from "./moveDetails/ReturnButton";
import Tagline from "./moveDetails/Tagline";
import Title from "./moveDetails/Title";
import Votes from "./moveDetails/Votes";

interface Props {
  movie: GetMovieMovie;
  moviesStore?: MoviesStore;
  withALoggedInUser: boolean;
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
        {this.props.withALoggedInUser ? (
          <>
            <Tagline tagline={this.props.movie.tagline} />
            <div className="movie-details">
              <Title title={this.props.movie.title} />
              <Overview overview={this.props.movie.overview} />
              <Genres movie={this.props.movie} />
              <CashFlow
                budget={this.props.movie.budget}
                revenue={this.props.movie.revenue}
              />
              <Votes
                vote_count={this.props.movie.vote_count}
                vote_average={this.props.movie.vote_average}
                popularity={this.props.movie.popularity}
              />
              <ReleaseDate release_date={this.props.movie.release_date} />
            </div>
            <ReturnButton handleMovieView={this.handleMovieView} />
          </>
        ) : (
          <>
            <Tagline tagline={this.props.movie.tagline} />
            <div className="movie-details">
              <Title title={this.props.movie.title} />
              <Overview overview={this.props.movie.overview} />
              <Genres movie={this.props.movie} />
            </div>
            <ReturnButton handleMovieView={this.handleMovieView} />
          </>
        )}
      </>
    );
  }
}
