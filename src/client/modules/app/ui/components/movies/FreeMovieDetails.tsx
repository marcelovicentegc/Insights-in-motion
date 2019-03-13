import * as React from "react";
import { GetMovieMovie } from "../../../../../__types__/typeDefs";
import Genres from "./movieDetails/Genres";
import Overview from "./movieDetails/Overview";
import Title from "./movieDetails/Title";

interface Props {
  movie: GetMovieMovie;
}

export default class FreeMovieDetail extends React.Component<Props> {
  render() {
    return (
      <>
        <Title title={this.props.movie.title} />
        <Overview overview={this.props.movie.overview} />
        <Genres movie={this.props.movie} />
      </>
    );
  }
}
