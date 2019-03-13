import * as React from "react";
import { Query } from "react-apollo";
import { getUser } from "../../../../../../server/schema/graphql/Queries.graphql";
import { GetUserQuery } from "../../../../../__types__/typeDefs";
import MoviesOnAList from "./MoviesOnAList";

export default class MoviesOnAListWrapper extends React.Component {
  render() {
    return (
      <Query<GetUserQuery> query={getUser}>
        {({ data, loading }) => {
          if (loading) return null;
          if (!data) {
            return <MoviesOnAList withALoggedInUser={false} user={null} />;
          }
          return <MoviesOnAList withALoggedInUser={true} user={data.user} />;
        }}
      </Query>
    );
  }
}
