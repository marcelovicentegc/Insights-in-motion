import * as React from "react";
import { Mutation } from "react-apollo";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { loginUser } from "../../../../../../server/schema/graphql/Mutations.graphql";
import {
  LoginUserMutation,
  LoginUserVariables
} from "../../../../../__types__/typeDefs";
import Logo from "../shared/Logo";

interface State {
  email: string;
  password: string;
}

class Login extends React.Component<RouteComponentProps<{}>, State> {
  constructor(props: RouteComponentProps) {
    super(props);

    this.state = {
      email: undefined,
      password: undefined
    };
  }

  render() {
    return (
      <>
        <Logo to="/" title="Go to the landing page" />
        <Mutation<LoginUserMutation, LoginUserVariables> mutation={loginUser}>
          {mutate => (
            <div className="login-wrapper form-wrapper">
              <div className="login form">
                <label>Email adress</label>
                <input
                  type="text"
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <label>Password</label>
                <input
                  type="password"
                  onChange={e => this.setState({ password: e.target.value })}
                />
                <button
                  onClick={async () => {
                    await mutate({
                      variables: {
                        email: this.state.email,
                        password: this.state.password
                      }
                    });
                    this.props.history.push("/");
                  }}
                >
                  Sign in
                </button>
              </div>
              <div className="login-callout form">
                <label>
                  Don't have an account? <Link to="/join">Create one.</Link>
                </label>
              </div>
            </div>
          )}
        </Mutation>
      </>
    );
  }
}

export default withRouter(Login);
