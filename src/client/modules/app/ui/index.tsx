import * as React from "react";
import Nav from "../../main/ui/components/shared/Nav";
import MoviesOnAListWrapper from "./components/movies/MoviesOnAListWrapper";
import SearchBar from "./components/movies/SearchBar";
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
