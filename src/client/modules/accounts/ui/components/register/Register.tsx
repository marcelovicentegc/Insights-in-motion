import { inject, observer } from "mobx-react";
import * as React from "react";
import { Mutation } from "react-apollo";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { createUser } from "../../../../../../server/schema/graphql/Mutations.graphql";
import { AccountsStore } from "../../../../../stores/Accounts.store";
import { MoviesStore } from "../../../../../stores/Movies.store";
import {
  CreateUserMutation,
  CreateUserVariables
} from "../../../../../__types__/typeDefs";
import Error from "../shared/Error";
import InputField from "../shared/InputField";
import Logo from "../shared/Logo";
import "../shared/main.scss";

interface Props extends RouteComponentProps {
  moviesStore?: MoviesStore;
  accountsStore?: AccountsStore;
}

@inject("moviesStore", "accountsStore")
@observer
class Register extends React.Component<Props> {
  resetQuery = () => {
    this.props.moviesStore.resetQuery();
  };

  private resetCredentials = () => {
    this.props.accountsStore.resetCredentials();
  };

  private success = () => {
    return this.props.accountsStore.success();
  };

  render() {
    this.props.accountsStore.errorMessage;
    this.props.accountsStore.email;
    this.props.accountsStore.username;
    this.props.accountsStore.password;
    return (
      <>
        {this.resetQuery()}
        <Logo to="/" title="Go to the landing page" icon="🎥" />
        <Mutation<CreateUserMutation, CreateUserVariables>
          mutation={createUser}
          onError={error =>
            (this.props.accountsStore.errorMessage = error.message)
          }
        >
          {mutate => (
            <>
              <div className="form-wrapper" id="join-us-form-wrapper">
                {this.props.accountsStore.errorMessage !== undefined ? (
                  this.props.accountsStore.email.length === 0 &&
                  this.props.accountsStore.password.length === 0 &&
                  this.props.accountsStore.username.length === 0 ? (
                    <Error message="Please provide your credentials" />
                  ) : this.props.accountsStore.email.length === 0 &&
                    this.props.accountsStore.username.length === 0 ? (
                    <Error message="Please provide an email and a username" />
                  ) : this.props.accountsStore.email.length === 0 &&
                    this.props.accountsStore.password.length === 0 ? (
                    <Error message="Please provide an email and a password" />
                  ) : this.props.accountsStore.username.length === 0 &&
                    this.props.accountsStore.password.length === 0 ? (
                    <Error message="Please provide a username and a password" />
                  ) : this.props.accountsStore.email.length === 0 ? (
                    <Error message="Please provide an email" />
                  ) : this.props.accountsStore.username.length === 0 ? (
                    <Error message="Please provide a username" />
                  ) : this.props.accountsStore.password.length === 0 ? (
                    <Error message="Please provide a password" />
                  ) : (
                    <>
                      <Error
                        message={this.props.accountsStore.errorMessage.slice(
                          15,
                          100
                        )}
                      />
                    </>
                  )
                ) : null}
                <div className="form" id="join-us-form">
                  <InputField label="Email address" type="text" name="email" />
                  <InputField label="Username" type="text" name="username" />
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
                          username: this.props.accountsStore.username,
                          password: this.props.accountsStore.password
                        }
                      });
                      this.success() ? this.props.history.push("/") : null;
                    }}
                  >
                    Create an account
                  </button>
                </div>
                <div className="form" id="form-callout">
                  <label>
                    Already have an account?{" "}
                    <Link to="/login" onClick={() => this.resetCredentials()}>
                      Sign in.
                    </Link>
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

export default withRouter(Register);
