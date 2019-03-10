import * as React from "react";
import { Query } from "react-apollo";
import { Link } from "react-router-dom";
import { getUser } from "../../../../../../server/schema/graphql/Queries.graphql";
import { GetUserQuery } from "../../../../../__types__/typeDefs";
import Logout from "../../../../accounts/ui/components/logging/Logout";
import "./main.scss";

export default class Nav extends React.Component {
  render() {
    return (
      <>
        <div className="nav">
          <Query<GetUserQuery> query={getUser}>
            {({ data }) => {
              if (!data || !data.user)
                return (
                  <>
                    <li className="nav-item" id="first">
                      <Link to="/join">sign up</Link>
                    </li>
                    <li className="nav-item" id="second">
                      <Link to="/login">sign in</Link>
                    </li>
                  </>
                );
              if (data.user)
                return (
                  <>
                    <li className="nav-item" id="first">
                      <Logout />
                    </li>
                    <li className="nav-item" id="second">
                      <Link to="/settings" title="Go to account settings">
                        {data.user.username}
                      </Link>
                    </li>
                  </>
                );
            }}
          </Query>
          <li className="nav-item" id="third">
            <Link to="/">insights in motion 🎥</Link>
          </li>
        </div>
      </>
    );
  }
}
