import * as React from "react";
import { GetMovieMovie } from "../../../../../__types__/typeDefs";
import { Genres, Overview, Title } from "./details/index";

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
