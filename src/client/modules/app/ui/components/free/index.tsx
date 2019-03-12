import * as React from "react";
import Nav from "../shared/Nav";
import "./main.scss";
import MoviesOnAListWrapper from "./MoviesOnAListWrapper";
import SearchBar from "./SearchBar";

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
