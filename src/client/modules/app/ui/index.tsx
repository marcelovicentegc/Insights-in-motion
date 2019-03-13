import * as React from "react";
import Nav from "../../main/ui/components/shared/Nav";
import MoviesOnAListWrapper from "./components/free/MoviesOnAListWrapper";
import SearchBar from "./components/free/SearchBar";
import "./main.scss";

export default class AppView extends React.Component {
  render() {
    return (
      <>
        <Nav />
        <SearchBar />
        <MoviesOnAListWrapper />
      </>
    );
  }
}
