import * as React from "react";
import Nav from "../../../../main/ui/components/shared/Nav";
import "./main.scss";
import MoviesOnMyList from "./MoviesOnMyList";

export default class MoviesOnMyListWrapper extends React.Component {
  render() {
    return (
      <>
        <Nav />
        <MoviesOnMyList />
      </>
    );
  }
}
