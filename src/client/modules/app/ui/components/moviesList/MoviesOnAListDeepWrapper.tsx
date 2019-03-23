import * as React from "react";
import Query from "react-apollo/Query";
import { getUser } from "../../../../../../server/schema/graphql/Queries.graphql";
import { GetUserQuery } from "../../../../../__types__/typeDefs";
import MoviesOnAListMiddleWrapper from "./MoviesOnAListMiddleWrapper";

export default class MoviesOnAListDeepWrapper extends React.Component {
  render() {
    return (
      <Query<GetUserQuery> query={getUser}>
        {({ data, loading }) => {
          if (loading) return null;
          if (!data) {
            return (
              <MoviesOnAListMiddleWrapper
                withALoggedInUser={false}
                user={null}
              />
            );
          }
          return (
            <MoviesOnAListMiddleWrapper
              withALoggedInUser={true}
              user={data.user}
            />
          );
        }}
      </Query>
    );
  }
}
