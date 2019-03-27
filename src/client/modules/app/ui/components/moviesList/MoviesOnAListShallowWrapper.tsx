import { inject, observer } from "mobx-react";
import * as React from "react";
import Query from "react-apollo/Query";
import { getMovies } from "../../../../../../server/schema/graphql/Queries.graphql";
import { MoviesStore } from "../../../../../stores/Movies.store";
import {
  GetMoviesQuery,
  GetMoviesVariables,
  GetUserUser
} from "../../../../../__types__/typeDefs";
import {
  Loading,
  NoData,
  NoSuchTitle,
  TypeInYourFavoriteMovie
} from "../messages";
import MovieDetailsWrapper from "../movieDetails/MovieDetailsWrapper";
import MoviesOnAList from "./MoviesOnAList";

interface Props {
  moviesStore?: MoviesStore;
  user: GetUserUser;
  userMovies?: Array<number>;
  withALoggedInUser: boolean;
}

@inject("moviesStore")
@observer
export default class MoviesOnAListShallowWrapper extends React.Component<
  Props
> {
  render() {
    this.props.moviesStore.movieList;
    return (
      <>
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
                      userMovies={this.props.userMovies}
                    />
                  </>
                ) : (
                  <MovieDetailsWrapper
                    withALoggedInUser={this.props.withALoggedInUser}
                    movieId={this.props.moviesStore.selectedMovie}
                  />
                )}
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
