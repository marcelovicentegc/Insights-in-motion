import { inject, observer } from "mobx-react";
import * as React from "react";
import { Query } from "react-apollo";
import { getMovies } from "../../../../../../server/schema/graphql/Queries.graphql";
import { MoviesStore } from "../../../../../stores/Movies.store";
import {
  GetMoviesQuery,
  GetMoviesVariables
} from "../../../../../__types__/typeDefs";
import Loading from "../messages/Loading";
import NoData from "../messages/NoData";
import NoSuchTitle from "../messages/NoSuchTitle";
import NumberOfResults from "../messages/NumberOfResults";
import TypeInYourFavoriteMovie from "../messages/TypeIn";
import MovieDetailWrapper from "./MovieDetailWrapper";

interface Props {
  moviesStore?: MoviesStore;
  withALoggedInUser: boolean;
}

@inject("moviesStore")
@observer
export default class MoviesOnAList extends React.Component<Props> {
  private handleMovieView = () => {
    this.props.moviesStore.handleMovieView();
  };

  render() {
    this.props.moviesStore.movieList;
    return (
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
                  <NumberOfResults results={data.movies.length} />
                  <div className="movies-list">
                    {data.movies.map((movie, i) => {
                      return (
                        <ul key={i} className="movie">
                          <li
                            onClick={e => {
                              this.props.moviesStore.selectedMovie = movie.id;
                              this.handleMovieView();
                            }}
                          >
                            {movie.title}
                          </li>
                        </ul>
                      );
                    })}
                  </div>
                </>
              ) : (
                <MovieDetailWrapper
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
