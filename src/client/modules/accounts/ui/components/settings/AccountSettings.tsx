import * as React from "react";
import Query from "react-apollo/Query";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { getUser } from "../../../../../../server/schema/graphql/Queries.graphql";
import { GetUserQuery } from "../../../../../__types__/typeDefs";
import { Loading } from "../../../../app/ui/components/messages/index";
import Nav from "../../../../main/ui/components/shared/Nav";
import EditAccount from "./EditAccount";

export default class AccountSettings extends React.Component {
  render() {
    return (
      <>
        <Nav />
        <Query<GetUserQuery> query={getUser}>
          {({ data, loading }) => {
            if (loading) return <Loading />;
            if (!data) {
              return <Redirect to="/login" />;
            }
            return (
              <>
                <div className="extra-wrapper">
                  <div className="list-wrapper">
                    <Link
                      to="/list"
                      title="Visit the movies you added to your list"
                    >
                      📝
                    </Link>
                  </div>
                  <div className="stats-wrapper">
                    <Link to="/stats" title="Visit your personal stats">
                      📈
                    </Link>
                  </div>
                </div>
                <EditAccount user={data.user} />
              </>
            );
          }}
        </Query>
      </>
    );
  }
}
