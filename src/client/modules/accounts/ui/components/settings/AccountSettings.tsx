import * as React from "react";
import { Mutation, Query } from "react-apollo";
import { Redirect } from "react-router";
import { updateUser } from "../../../../../../server/schema/graphql/Mutations.graphql";
import { getUser } from "../../../../../../server/schema/graphql/Queries.graphql";
import {
  GetUserQuery,
  UpdateUserMutation,
  UpdateUserVariables
} from "../../../../../__types__/typeDefs";
import Loading from "../../../../home/ui/components/messages/Loading";
import Nav from "../../../../home/ui/components/shared/Nav";

export default class AccountSettings extends React.Component {
  render() {
    return (
      <>
        <Query<GetUserQuery> query={getUser}>
          {({ data, loading }) => {
            if (loading) return <Loading />;
            if (!data) {
              return <Redirect to="/login" />;
            }
            return (
              <>
                <Nav />
                <p>{data.user.username}</p>
                <p>Click to update ---> UpdateUserMutation</p>
                <p>Click to see stats ---> mutations yet to come...</p>
                <Mutation<UpdateUserMutation, UpdateUserVariables>
                  mutation={updateUser}
                  variables={{
                    id: data.user.id.toString(),
                    email: data.user.email,
                    username: data.user.username,
                    password: data.user.password
                  }}
                >
                  {mutate => <p>Your account settings</p>}
                </Mutation>
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
