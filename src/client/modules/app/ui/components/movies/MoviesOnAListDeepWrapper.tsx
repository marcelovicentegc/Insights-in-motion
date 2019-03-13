import * as React from "react";
import { Query } from "react-apollo";
import { getUser } from "../../../../../../server/schema/graphql/Queries.graphql";
import { GetUserQuery } from "../../../../../__types__/typeDefs";
import MoviesOnAListShallowWrapper from "./MoviesOnAListShallowWrapper";

export default class MoviesOnAListDeepWrapper extends React.Component {
  render() {
    return (
      <Query<GetUserQuery> query={getUser}>
        {({ data, loading }) => {
          if (loading) return null;
          if (!data) {
            return (
              <MoviesOnAListShallowWrapper
                withALoggedInUser={false}
                user={null}
              />
            );
          }
          return (
            <MoviesOnAListShallowWrapper
              withALoggedInUser={true}
              user={data.user}
            />
          );
        }}
      </Query>
    );
  }
}
