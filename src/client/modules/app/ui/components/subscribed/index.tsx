import * as React from "react";
import Nav from "../shared/Nav";
import "./main.scss";
import MoviesOnMyList from "./MoviesOnMyList";

export default class CustomListView extends React.Component {
  render() {
    return (
      <>
        <Nav />
        <MoviesOnMyList />
      </>
    );
  }
}
