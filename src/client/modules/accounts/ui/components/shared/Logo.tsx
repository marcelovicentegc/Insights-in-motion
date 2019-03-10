import * as React from "react";
import { Link } from "react-router-dom";

interface Props {
  to: string;
  title: string;
}

const Logo: React.SFC<Props> = props => {
  return (
    <>
      <div className="logo-wrapper">
        <Link to={props.to} title={props.title}>
          🎥
        </Link>
      </div>
    </>
  );
};

export default Logo;
