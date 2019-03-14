import { inject, observer } from "mobx-react";
import * as React from "react";
import { Mutation } from "react-apollo";
import { Link, RouteComponentProps, withRouter } from "react-router-dom";
import { loginUser } from "../../../../../../server/schema/graphql/Mutations.graphql";
import { MoviesStore } from "../../../../../stores/Movies.store";
import {
  LoginUserMutation,
  LoginUserVariables
} from "../../../../../__types__/typeDefs";
import Error from "../shared/Error";
import Logo from "../shared/Logo";

interface Props extends RouteComponentProps {
  moviesStore?: MoviesStore;
}

interface State {
  email: string;
  password: string;
  error: string;
}

@inject("moviesStore")
@observer
class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: "",
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
        <Mutation<LoginUserMutation, LoginUserVariables>
          mutation={loginUser}
          onError={error => this.setState({ error: error.message })}
        >
          {mutate => (
            <>
              <div className="form-wrapper" id="login-form-wrapper ">
                {this.state.error !== undefined ? (
                  this.state.email.length === 0 &&
                  this.state.password.length === 0 ? (
                    <Error message="Please provide an email and a password" />
                  ) : this.state.password.length === 0 ? (
                    <div className="error">
                      <Error message="Please provide a password" />
                    </div>
                  ) : this.state.email.length === 0 ? (
                    <Error message="Please provide an email" />
                  ) : (
                    <Error message={this.state.error.slice(15, 100)} />
                  )
                ) : null}
                <div className="form" id="login-form">
                  <label>Email adress</label>
                  <input
                    type="text"
                    onChange={e =>
                      this.setState({
                        email: e.target.value,
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
                          password: this.state.password
                        }
                      });
                      this.success(this.state.error)
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
