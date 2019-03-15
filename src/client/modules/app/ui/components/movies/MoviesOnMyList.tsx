import * as React from "react";
import { Query } from "react-apollo";
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
import Logo from "../../../../accounts/ui/components/shared/Logo";
import Loading from "../messages/Loading";
import Message from "../messages/Message";

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
                    <>
                      <div className="no-data-wrapper">
                        <Message message="Why not add movies to your list?" />
                        <Logo to="/app" title="Go to the app" icon="🎬" />
                      </div>
                    </>
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
