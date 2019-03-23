import * as React from "react";
import Mutation from "react-apollo/Mutation";
import { updateUser } from "../../../../../../server/schema/graphql/Mutations.graphql";
import { getUser } from "../../../../../../server/schema/graphql/Queries.graphql";
import {
  GetUserUser,
  UpdateUserMutation,
  UpdateUserVariables
} from "../../../../../__types__/typeDefs";

interface Props {
  user: GetUserUser;
}

interface State {
  email: string;
  username: string;
  password: string;
  errorMessage: string;
}

export default class EditAccount extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      email: "",
      username: "",
      password: "",
      errorMessage: undefined
    };
  }

  private emailInput = React.createRef<HTMLInputElement>();
  private usernameInput = React.createRef<HTMLInputElement>();
  private passwordInput = React.createRef<HTMLInputElement>();
  private submitButton = React.createRef<HTMLInputElement>();

  private displayInput = (input: React.RefObject<HTMLInputElement>) => {
    let submitButtonStyle = this.submitButton.current.style;
    let inputStyle = input.current.style;
    inputStyle.padding === "0px"
      ? ((inputStyle.padding = "12px 8px"),
        (inputStyle.fontSize = "22px"),
        (inputStyle.cursor = "text"),
        (submitButtonStyle.fontSize = "22px"),
        (inputStyle.padding = "12px 8px"),
        (inputStyle.fontSize = "22px"),
        (inputStyle.cursor = "text"))
      : ((inputStyle.padding = "0px"),
        (inputStyle.fontSize = "0px"),
        (inputStyle.cursor = "pointer"));

    let emailInputPadding = this.emailInput.current.style.padding;
    let usernameInputPadding = this.usernameInput.current.style.padding;
    let passwordInputPadding = this.passwordInput.current.style.padding;

    emailInputPadding === "0px" &&
    passwordInputPadding === "0px" &&
    usernameInputPadding === "0px"
      ? ((submitButtonStyle.fontSize = "0px"),
        (submitButtonStyle.fontSize = "0px"),
        (submitButtonStyle.lineHeight = "0px"),
        (submitButtonStyle.padding = "0px"),
        (submitButtonStyle.backgroundColor = "#d1d5da"),
        (submitButtonStyle.backgroundImage = "unset"),
        (submitButtonStyle.backgroundPosition = "unset"),
        (submitButtonStyle.borderColor = "unset"),
        (submitButtonStyle.border = "unset"))
      : ((submitButtonStyle.fontSize = "22px"),
        (submitButtonStyle.lineHeight = "20px"),
        (submitButtonStyle.padding = "16px"),
        (submitButtonStyle.backgroundColor = "#28a745"),
        (submitButtonStyle.backgroundImage =
          "linear-gradient(-180deg, #01d277, #28a745 90%)"),
        (submitButtonStyle.backgroundPosition = "-1px -1px"),
        (submitButtonStyle.border = "1px solid rgba(27, 31, 35, 0.2)"));
  };

  success = (errorMessage: string) => {
    if (errorMessage.length !== 0) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    return (
      <Mutation<UpdateUserMutation, UpdateUserVariables>
        mutation={updateUser}
        variables={{
          id: this.props.user.id.toString(),
          email: this.props.user.email,
          username: this.props.user.username,
          password: this.props.user.password
        }}
        refetchQueries={[{ query: getUser }]}
        onError={error => this.setState({ errorMessage: error.message })}
      >
        {mutate => (
          <div className="form-wrapper" id="edit-wrapper">
            {/* errors */}
            <div className="form" id="edit">
              <label onClick={e => this.displayInput(this.emailInput)}>
                Email adress
              </label>
              <input
                style={{ padding: "0px", fontSize: "0px", cursor: "pointer" }}
                ref={this.emailInput}
                id="edit-email"
                type="text"
                placeholder={this.props.user.email}
                onChange={e => this.setState({ email: e.target.value })}
              />
              <label onClick={e => this.displayInput(this.usernameInput)}>
                Username
              </label>
              <input
                style={{ padding: "0px", fontSize: "0px", cursor: "pointer" }}
                ref={this.usernameInput}
                id="edit-username"
                type="text"
                placeholder={this.props.user.username}
                onChange={e => this.setState({ username: e.target.value })}
              />
              <label onClick={e => this.displayInput(this.passwordInput)}>
                Password
              </label>
              <input
                style={{ padding: "0px", fontSize: "0px", cursor: "pointer" }}
                ref={this.passwordInput}
                id="edit-password"
                type="password"
                onChange={e => this.setState({ password: e.target.value })}
              />
              <button
                ref={this.submitButton}
                style={{
                  fontSize: "0px",
                  lineHeight: "0px",
                  margin: "0px",
                  padding: "0px",
                  backgroundColor: "#d1d5da",
                  backgroundImage: "unset",
                  backgroundPosition: "unset",
                  borderColor: "unset",
                  border: "unset"
                }}
                onClick={async () => {
                  await mutate({
                    variables: {
                      id: this.props.user.id.toString(),
                      email: this.state.email || this.props.user.email,
                      username: this.state.username || this.props.user.username,
                      password: this.state.password || this.props.user.password
                    }
                  });
                  this.success(this.state.errorMessage)
                    ? window.location.reload()
                    : null;
                }}
              >
                Update info
              </button>
            </div>
          </div>
        )}
      </Mutation>
    );
  }
}
