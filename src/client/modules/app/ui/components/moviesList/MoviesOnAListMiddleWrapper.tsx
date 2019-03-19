import { inject, observer } from "mobx-react";
import * as React from "react";
import { MoviesStore } from "../../../../../stores/Movies.store";
import { GetUserUser } from "../../../../../__types__/typeDefs";
import MoviesOnAListShallowWrapper from "./MoviesOnAListShallowWrapper";

interface Props {
  moviesStore?: MoviesStore;
  withALoggedInUser: boolean;
  user: GetUserUser | null;
}

@inject("moviesStore")
@observer
export default class MoviesOnAListMiddleWrapper extends React.Component<Props> {
  tinder = () => {
    return this.props.user.movies.map(userMovie => {
      return userMovie.movieId;
    });
  };

  render() {
    return this.props.withALoggedInUser ? (
      <MoviesOnAListShallowWrapper
        user={this.props.user}
        withALoggedInUser={true}
        userMovies={this.tinder()}
      />
    ) : (
      <MoviesOnAListShallowWrapper
        user={this.props.user}
        withALoggedInUser={false}
      />
    );
  }
}
