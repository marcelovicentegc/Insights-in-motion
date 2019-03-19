import * as React from "react";
import { GetMovieMovie } from "../../../../../__types__/typeDefs";
import { CashFlow, ReleaseDate, Votes } from "./details/index";

interface Props {
  movie: GetMovieMovie;
}

export default class ExtraMovieDetail extends React.Component<Props> {
  render() {
    return (
      <>
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
      </>
    );
  }
}
