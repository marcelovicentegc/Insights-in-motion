import { inject, observer } from "mobx-react";
import * as React from "react";
import { Mutation } from "react-apollo";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { createUser } from "../../../../../../server/schema/graphql/Mutations.graphql";
import { MoviesStore } from "../../../../../stores/Movies.store";
import {
  CreateUserMutation,
  CreateUserVariables
} from "../../../../../__types__/typeDefs";
import Error from "../shared/Error";
import Logo from "../shared/Logo";
import "../shared/main.scss";

interface Props extends RouteComponentProps {
  moviesStore?: MoviesStore;
}

interface State {
  email: string;
  username: string;
  password: string;
  error: string;
}

@inject("moviesStore", "accountsStore")
@observer
class Register extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",
      error: undefined
    };
  }

  resetQuery = () => {
    this.props.moviesStore.resetQuery();
  };

  private success = (errorMessage: string) => {
    if (!errorMessage) {
      return true;
    } else {
      return false;
    }
  };

  render() {
    return (
      <>
        {this.resetQuery()}
        <Logo to="/" title="Go to the landing page" icon="🎥" />
        <Mutation<CreateUserMutation, CreateUserVariables>
          mutation={createUser}
          onError={error => this.setState({ error: error.message })}
        >
          {mutate => (
            <>
              <div className="form-wrapper" id="join-us-form-wrapper">
                {this.state.error !== undefined ? (
                  this.state.email.length === 0 &&
                  this.state.password.length === 0 &&
                  this.state.username.length === 0 ? (
                    <Error message="Please provide your credentials" />
                  ) : this.state.email.length === 0 &&
                    this.state.username.length === 0 ? (
                    <Error message="Please provide an email and a username" />
                  ) : this.state.email.length === 0 &&
                    this.state.password.length === 0 ? (
                    <Error message="Please provide an email and a password" />
                  ) : this.state.username.length === 0 &&
                    this.state.password.length === 0 ? (
                    <Error message="Please provide a username and a password" />
                  ) : this.state.email.length === 0 ? (
                    <Error message="Please provide an email" />
                  ) : this.state.username.length === 0 ? (
                    <Error message="Please provide a username" />
                  ) : this.state.password.length === 0 ? (
                    <Error message="Please provide a password" />
                  ) : (
                    <>
                      <Error message={this.state.error.slice(15, 100)} />
                    </>
                  )
                ) : null}
                <div className="form" id="join-us-form">
                  <label>Email adress</label>
                  <input
                    type="text"
                    onChange={e =>
                      this.setState({ email: e.target.value, error: undefined })
                    }
                  />
                  <label>Username</label>
                  <input
                    type="text"
                    onChange={e =>
                      this.setState({
                        username: e.target.value,
                        error: undefined
                      })
                    }
                  />
                  <label>Password</label>
                  <input
                    type="password"
                    onChange={e =>
                      this.setState({
                        password: e.target.value,
                        error: undefined
                      })
                    }
                  />
                  <button
                    onClick={async () => {
                      await mutate({
                        variables: {
                          email: this.state.email,
                          username: this.state.username,
                          password: this.state.password
                        }
                      });
                      this.success(this.state.error)
                        ? this.props.history.push("/")
                        : null;
                    }}
                  >
                    Create an account
                  </button>
                </div>
                <div className="form" id="form-callout">
                  <label>
                    Already have an account? <Link to="/login">Sign in.</Link>
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
