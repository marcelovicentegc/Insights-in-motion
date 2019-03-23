import * as React from "react";
import Query from "react-apollo/Query";
import { Redirect } from "react-router";
import {
  getMovie,
  getUser
} from "../../../../../../server/schema/graphql/Queries.graphql";
import {
  GetMovieQuery,
  GetMovieVariables,
  GetUserQuery
} from "../../../../../__types__/typeDefs";
import { Loading } from "../messages/index";
import WhyNotAddMovies from "../messages/WhyNotAddMovies";

export default class MoviesOnMyList extends React.Component {
  render() {
    return (
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
                                  <h4>{data.movie.title}</h4>
                                </li>
                              </ul>
                            );
                          }}
                        </Query>
                      );
                    })
                  )}
                </div>
              </div>
            </>
          );
        }}
      </Query>
    );
  }
}
