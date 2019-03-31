import { inject, observer } from "mobx-react";
import * as React from "react";
import { AccountsStore } from "../../../../../stores/Accounts.store";
import Nav from "../shared/Nav";
import FloatingPosters from "./FloatingPosters";
import LandingPage from "./LandingPage";

interface Props {
  accountsStore?: AccountsStore;
}

@inject("accountsStore")
@observer
export default class LandingView extends React.Component<Props> {
  componentDidMount() {
    this.props.accountsStore.resetCredentials();
  }

  render() {
    return (
      <>
        <Nav />
        <LandingPage />
        <FloatingPosters />
      </>
    );
  }
}
