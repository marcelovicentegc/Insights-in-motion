import { inject, observer } from "mobx-react";
import * as React from "react";
import { AccountsStore } from "../../../../../stores/Accounts.store";
import { MoviesStore } from "../../../../../stores/Movies.store";
import Nav from "../shared/Nav";
import FloatingPosters from "./FloatingPosters";
import LandingPage from "./LandingPage";

interface Props {
  moviesStore?: MoviesStore;
  accountsStore?: AccountsStore;
}

@inject("moviesStore", "accountsStore")
@observer
export default class LandingView extends React.Component<Props> {
  resetQuery = () => {
    this.props.moviesStore.resetQuery();
  };

  private resetCredentials = () => {
    this.props.accountsStore.resetCredentials();
  };

  render() {
    return (
      <>
        {this.resetCredentials()}
        {this.resetQuery()}
        <Nav />
        <LandingPage />
        <FloatingPosters />
      </>
    );
  }
}
