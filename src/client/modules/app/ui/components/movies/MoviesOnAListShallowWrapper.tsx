import { inject, observer } from "mobx-react";
import * as React from "react";
import { Query } from "react-apollo";
import { getMovies } from "../../../../../../server/schema/graphql/Queries.graphql";
import { MoviesStore } from "../../../../../stores/Movies.store";
import {
  GetMoviesQuery,
  GetMoviesVariables,
  GetUserUser
} from "../../../../../__types__/typeDefs";
import Loading from "../messages/Loading";
import NoData from "../messages/NoData";
import NoSuchTitle from "../messages/NoSuchTitle";
import TypeInYourFavoriteMovie from "../messages/TypeIn";
import MovieDetailWrapper from "./MovieDetailWrapper";
import MoviesOnAList from "./MoviesOnAList";

interface Props {
  moviesStore?: MoviesStore;
  withALoggedInUser: boolean;
  user: GetUserUser | null;
}

@inject("moviesStore")
@observer
export default class MoviesOnAListShallowWrapper extends React.Component<
  Props
> {
  tinder = () => {
    return this.props.user.movies.map(userMovie => {
      return userMovie.movieId;
    });
  };

  render() {
    this.props.moviesStore.movieList;
    return this.props.withALoggedInUser ? (
      <Query<GetMoviesQuery, GetMoviesVariables>
        query={getMovies}
        variables={{ query: this.props.moviesStore.query }}
        fetchPolicy="network-only"
      >
        {({ data, loading }) => {
          let userMovies = this.tinder();
          if (loading) return <Loading />;
          if (!data) return <NoData />;
          if (data.movies === null) return <TypeInYourFavoriteMovie />;
          if (data.movies.length === 0) return <NoSuchTitle />;
          return (
            <>
              {this.props.moviesStore.movieList ? (
                <MoviesOnAList
                  data={data}
                  user={this.props.user}
                  userMovies={userMovies}
                  withALoggedInUser={this.props.withALoggedInUser}
                />
              ) : (
                <MovieDetailWrapper
                  withALoggedInUser={this.props.withALoggedInUser}
                  movieId={this.props.moviesStore.selectedMovie}
                />
              )}
            </>
          );
        }}
      </Query>
    ) : (
      <Query<GetMoviesQuery, GetMoviesVariables>
        query={getMovies}
        variables={{ query: this.props.moviesStore.query }}
        fetchPolicy="cache-and-network"
        notifyOnNetworkStatusChange={true}
      >
        {({ data, loading }) => {
          if (loading) return <Loading />;
          if (!data) return <NoData />;
          if (data.movies === null) return <TypeInYourFavoriteMovie />;
          if (data.movies.length === 0) return <NoSuchTitle />;
          return (
            <>
              {this.props.moviesStore.movieList ? (
                <>
                  <MoviesOnAList
                    data={data}
                    user={this.props.user}
                    withALoggedInUser={this.props.withALoggedInUser}
                  />
                </>
              ) : (
                <MovieDetailWrapper
                  withALoggedInUser={this.props.withALoggedInUser}
                  movieId={this.props.moviesStore.selectedMovie}
                />
              )}
            </>
          );
        }}
      </Query>
    );
  }
}
