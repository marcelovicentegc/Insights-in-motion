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
import Logo from "../shared/Logo";
import "../shared/main.scss";

interface Props extends RouteComponentProps {
  moviesStore?: MoviesStore;
}

interface State {
  email: string;
  username: string;
  password: string;
}

@inject("moviesStore")
@observer
class Register extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: undefined,
      username: undefined,
      password: ""
    };
  }

  resetQuery = () => {
    this.props.moviesStore.resetQuery();
  };

  render() {
    return (
      <>
        {this.resetQuery()}
        <Logo to="/" title="Go to the landing page" icon="🎥" />
        <Mutation<CreateUserMutation, CreateUserVariables>
          mutation={createUser}
        >
          {mutate => (
            <div className="form-wrapper" id="join-us-form-wrapper">
              <div className="form" id="join-us-form">
                <label>Email adress</label>
                <input
                  type="text"
                  onChange={e => this.setState({ email: e.target.value })}
                />
                <label>Username</label>
                <input
                  type="text"
                  onChange={e => this.setState({ username: e.target.value })}
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
                        username: this.state.username,
                        password: this.state.password
                      }
                    });
                    this.props.history.push("/");
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
          )}
        </Mutation>
      </>
    );
  }
}

export default withRouter(Register);
