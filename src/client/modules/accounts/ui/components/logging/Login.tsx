import { inject, observer } from "mobx-react";
import * as React from "react";
import Mutation from "react-apollo/Mutation";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { loginUser } from "../../../../../../server/schema/graphql/Mutations.graphql";
import { AccountsStore } from "../../../../../stores/Accounts.store";
import { MoviesStore } from "../../../../../stores/Movies.store";
import {
  LoginUserMutation,
  LoginUserVariables
} from "../../../../../__types__/typeDefs";
import Error from "../shared/Error";
import InputField from "../shared/InputField";
import Logo from "../shared/Logo";

interface Props extends RouteComponentProps {
  moviesStore?: MoviesStore;
  accountsStore?: AccountsStore;
}

@inject("accountsStore")
@observer
class Login extends React.Component<Props> {
  componentDidMount() {
    this.props.accountsStore.resetCredentials();
  }

  componentWillUnmount() {
    this.props.accountsStore.resetCredentials();
  }

  render() {
    this.props.accountsStore.errorMessage;
    this.props.accountsStore.email;
    this.props.accountsStore.password;
    return (
      <>
        <Logo to="/" title="Go to the landing page" icon="🎥" />
        <Mutation<LoginUserMutation, LoginUserVariables>
          mutation={loginUser}
          onError={error =>
            (this.props.accountsStore.errorMessage = error.message)
          }
        >
          {mutate => (
            <>
              <div className="form-wrapper" id="login-form-wrapper ">
                {this.props.accountsStore.errorMessage !== undefined ? (
                  this.props.accountsStore.email.length === 0 &&
                  this.props.accountsStore.password.length === 0 ? (
                    <Error message="Please provide an email and a password" />
                  ) : this.props.accountsStore.password.length === 0 ? (
                    <Error message="Please provide a password" />
                  ) : this.props.accountsStore.email.length === 0 ? (
                    <Error message="Please provide an email" />
                  ) : (
                    <Error
                      message={this.props.accountsStore.errorMessage.slice(
                        15,
                        100
                      )}
                    />
                  )
                ) : null}
                <div className="form" id="login-form">
                  <InputField label="Email address" type="text" name="email" />
                  <InputField
                    label="Password"
                    type="password"
                    name="password"
                  />
                  <button
                    onClick={async () => {
                      await mutate({
                        variables: {
                          email: this.props.accountsStore.email,
                          password: this.props.accountsStore.password
                        }
                      });
                      this.props.accountsStore.success()
                        ? this.props.history.push("/")
                        : null;
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
            </>
          )}
        </Mutation>
      </>
    );
  }
}

export default withRouter(Login);
