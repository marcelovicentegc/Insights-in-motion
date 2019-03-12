import * as React from "react";
import { Query } from "react-apollo";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { getUser } from "../../../../../../server/schema/graphql/Queries.graphql";
import { GetUserQuery } from "../../../../../__types__/typeDefs";
import Loading from "../../../../app/ui/components/messages/Loading";
import Nav from "../../../../app/ui/components/shared/Nav";
import EditAccount from "./EditAccount";

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
                <EditAccount user={data.user} />
                <div className="list-wrapper">
                  <Link to="/list">📝</Link>
                </div>
                {/* stats */}
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
