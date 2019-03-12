import * as React from "react";
import { Query } from "react-apollo";
import {
  getMovie,
  getUser
} from "../../../../../../server/schema/graphql/Queries.graphql";
import {
  GetMovieQuery,
  GetMovieVariables,
  GetUserQuery
} from "../../../../../__types__/typeDefs";
import Loading from "../messages/Loading";
import NoData from "../messages/NoData";
import NoSuchTitle from "../messages/NoSuchTitle";
import Nav from "../shared/Nav";

export default class CustomListView extends React.Component {
  render() {
    return (
      <>
        <Nav />
        <Query<GetUserQuery> query={getUser}>
          {({ data, loading }) => {
            if (loading) return <Loading />;
            return (
              <>
                <p>{data.user.username}'s movie list</p>
                {data.user.movies.map((movie, i) => {
                  return (
                    <Query<GetMovieQuery, GetMovieVariables>
                      key={i}
                      query={getMovie}
                      variables={{ id: movie.movieId }}
                    >
                      {({ data, loading }) => {
                        if (loading) return <Loading />;
                        if (!data.movie) return <NoData />;
                        if (!data.movie.id) return <NoSuchTitle />;
                        return <p>{data.movie.title}</p>;
                      }}
                    </Query>
                  );
                })}
                <p />
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
