import { inject, observer } from "mobx-react";
import * as React from "react";
import Query from "react-apollo/Query";
import { Redirect } from "react-router";
import {
  getMovie,
  getUser
} from "../../../../../../server/schema/graphql/Queries.graphql";
import { MoviesStore } from "../../../../../stores/Movies.store";
import {
  GetMovieQuery,
  GetMovieVariables,
  GetUserQuery
} from "../../../../../__types__/typeDefs";
import { Loading } from "../messages/index";
import WhyNotAddMovies from "../messages/WhyNotAddMovies";
import MovieDetail from "../movieDetails/MovieDetails";

interface Props {
  moviesStore?: MoviesStore;
}

@inject("moviesStore")
@observer
export default class MoviesOnMyList extends React.Component<Props> {
  private handleMovieView = () => {
    this.props.moviesStore.handleMovieView();
  };
  render() {
    return (
      <>
        {this.props.moviesStore.movieList}
        <Query<GetUserQuery> query={getUser}>
          {({ data, loading }) => {
            if (loading) return <Loading />;
            if (!data) {
              return <Redirect to="/login" />;
            }
            return (
              <>
                <div className="personal-list">
                  <p className="title">{data.user.username}'s list</p>
                  {this.props.moviesStore.movieList ? (
                    <div className="movies-list">
                      {data.user.movies.length === 0 ? (
                        <WhyNotAddMovies />
                      ) : (
                        data.user.movies.map((movie, i) => {
                          return (
                            <Query<GetMovieQuery, GetMovieVariables>
                              key={i}
                              query={getMovie}
                              variables={{ id: movie.movieId }}
                            >
                              {({ data, loading }) => {
                                if (loading) return null;
                                return (
                                  <ul className="movie">
                                    <li>
                                      <h4
                                        onClick={() => {
                                          this.props.moviesStore.selectedMovie =
                                            data.movie.id;
                                          this.handleMovieView();
                                        }}
                                      >
                                        {data.movie.title}
                                      </h4>
                                    </li>
                                  </ul>
                                );
                              }}
                            </Query>
                          );
                        })
                      )}
                    </div>
                  ) : (
                    <Query<GetMovieQuery, GetMovieVariables>
                      query={getMovie}
                      variables={{ id: this.props.moviesStore.selectedMovie }}
                    >
                      {({ data, loading }) => {
                        if (loading) return <Loading />;
                        return (
                          <MovieDetail
                            movie={data.movie}
                            withALoggedInUser={true}
                            withRegisteredUserLenses={true}
                          />
                        );
                      }}
                    </Query>
                  )}
                </div>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
