import * as React from "react";
import Movies from "./components/movies/index";
import "./main.scss";

export default class HomeView extends React.Component {
  render() {
    return (
      <>
        <div className="nav">
          <p>🎥</p>
        </div>
        <Movies />
      </>
    );
  }
}
