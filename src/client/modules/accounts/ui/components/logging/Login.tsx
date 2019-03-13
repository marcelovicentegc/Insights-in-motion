import * as React from "react";
import { Mutation } from "react-apollo";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { loginUser } from "../../../../../../server/schema/graphql/Mutations.graphql";
import { AccountsStore } from "../../../../../stores/Accounts.store";
import {
  LoginUserMutation,
  LoginUserVariables
} from "../../../../../__types__/typeDefs";
import Nav from "../../../../main/ui/components/shared/Nav";
import Logo from "../shared/Logo";

interface Props extends RouteComponentProps {
  accountsStore?: AccountsStore;
}

interface State {
  email: string;
  password: string;
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: undefined,
      password: undefined
    };
  }

  render() {
    return (
      <>
        <Nav />
        <Logo to="/" title="Go to the landing page" icon="🎥" />
        <Mutation<LoginUserMutation, LoginUserVariables> mutation={loginUser}>
          {mutate => (
            <div className="form-wrapper" id="login-form-wrapper ">
              <div className="form" id="login-form">
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
              <div className="form" id="form-callout">
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
