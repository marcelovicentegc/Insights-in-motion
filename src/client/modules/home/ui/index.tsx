import * as React from "react";
import LandingPage from "./components/main/LandingPage";
import Nav from "./components/shared/Nav";
import "./main.scss";

export default class LandingView extends React.Component {
  render() {
    return (
      <>
        <Nav />
        <LandingPage />
      </>
    );
  }
}
