import * as React from "react";

interface Props {
  overview: string | null;
}

const Overview: React.FC<Props> = props => {
  return (
    <div className="movie-overview movie-detail">
      <p>Overview</p>
      <p>
        <span>{props.overview}</span>
      </p>
    </div>
  );
};

export default Overview;
