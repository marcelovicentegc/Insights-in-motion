import { inject, observer } from "mobx-react";
import * as React from "react";
import { AccountsStore } from "../../../../../stores/Accounts.store";

interface Props {
  accountsStore?: AccountsStore;
  label: string;
  type: string;
  name: string;
}

@inject("accountsStore")
@observer
export default class InputField extends React.Component<Props> {
  handleChange = (name: string, value: string) => {
    return this.props.accountsStore.handleChange(name, value);
  };

  render() {
    return (
      <>
        <label>{this.props.label}</label>
        <input
          type={this.props.type}
          name={this.props.name}
          onChange={e => this.handleChange(e.target.name, e.target.value)}
        />
      </>
    );
  }
}
