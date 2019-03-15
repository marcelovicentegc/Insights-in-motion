import { inject, observer } from "mobx-react";
import * as React from "react";
import { AccountsStore } from "../../../stores/Accounts.store";
import Nav from "../../main/ui/components/shared/Nav";
import MoviesOnAListDeepWrapper from "./components/movies/MoviesOnAListDeepWrapper";
import SearchBar from "./components/movies/SearchBar";
import "./main.scss";

interface Props {
  accountsStore?: AccountsStore;
}

@inject("accountsStore")
@observer
export default class AppView extends React.Component<Props> {
  private resetCredentials = () => {
    this.props.accountsStore.resetCredentials();
  };

  render() {
    return (
      <>
        {this.resetCredentials()}
        <Nav />
        <SearchBar />
        <MoviesOnAListDeepWrapper />
      </>
    );
  }
}
