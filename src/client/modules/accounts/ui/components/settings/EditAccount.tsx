import { inject, observer } from "mobx-react";
import * as React from "react";
import Mutation from "react-apollo/Mutation";
import { updateUser } from "../../../../../../server/schema/graphql/Mutations.graphql";
import { getUser } from "../../../../../../server/schema/graphql/Queries.graphql";
import { AccountsStore } from "../../../../../stores/Accounts.store";
import {
  GetUserUser,
  UpdateUserMutation,
  UpdateUserVariables
} from "../../../../../__types__/typeDefs";
import Error from "../shared/Error";
import Success from "../shared/Success";

interface Props {
  user: GetUserUser;
  accountsStore?: AccountsStore;
}

interface State {
  success: boolean;
}

@inject("accountsStore")
@observer
export default class EditAccount extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      success: false
    };
  }

  componentDidMount() {
    this.props.accountsStore.resetCredentials();
  }

  componentWillUnmount() {
    this.props.accountsStore.resetCredentials();
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

  render() {
    this.props.accountsStore.errorMessage;
    this.props.accountsStore.email = this.props.user.email;
    this.props.accountsStore.username = this.props.user.username;
    this.props.accountsStore.password = this.props.user.password;
    return (
      <Mutation<UpdateUserMutation, UpdateUserVariables>
        mutation={updateUser}
        refetchQueries={[{ query: getUser }]}
        onError={error =>
          (this.props.accountsStore.errorMessage = error.message.slice(15, 100))
        }
      >
        {mutate => (
          <div className="form-wrapper" id="edit-wrapper">
            {this.props.accountsStore.errorMessage ? (
              <Error message={this.props.accountsStore.errorMessage} />
            ) : null}
            {this.state.success ? (
              <Success message={"Your account was succesfully updated"} />
            ) : null}
            <div
              className="form"
              id="edit"
              style={
                this.props.accountsStore.errorMessage || this.state.success
                  ? { marginTop: "0vh" }
                  : { marginTop: "5vh" }
              }
            >
              <label onClick={e => this.displayInput(this.emailInput)}>
                Email adress
              </label>
              <input
                style={{ padding: "0px", fontSize: "0px", cursor: "pointer" }}
                ref={this.emailInput}
                id="edit-email"
                type="text"
                placeholder={this.props.user.email}
                autoCapitalize="off"
                onChange={e => {
                  this.props.accountsStore.email = e.target.value;
                  this.props.accountsStore.errorMessage = undefined;
                }}
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
                autoComplete="off"
                onChange={e => {
                  this.props.accountsStore.username = e.target.value;
                  this.props.accountsStore.errorMessage = undefined;
                }}
              />
              <label onClick={e => this.displayInput(this.passwordInput)}>
                Password
              </label>
              <input
                style={{ padding: "0px", fontSize: "0px", cursor: "pointer" }}
                ref={this.passwordInput}
                id="edit-password"
                type="password"
                autoComplete="off"
                onChange={e => {
                  this.props.accountsStore.password = e.target.value;
                  this.props.accountsStore.errorMessage = undefined;
                }}
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
                      email:
                        this.props.accountsStore.email.length === 0
                          ? this.props.user.email
                          : this.props.accountsStore.email,
                      username:
                        this.props.accountsStore.username.length === 0
                          ? this.props.user.username
                          : this.props.accountsStore.username,
                      password:
                        this.props.accountsStore.password.length === 0
                          ? this.props.user.password
                          : this.props.accountsStore.password
                    }
                  }).then(() => {
                    this.props.accountsStore.success()
                      ? this.setState({
                          success: true
                        })
                      : null;
                  });
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
