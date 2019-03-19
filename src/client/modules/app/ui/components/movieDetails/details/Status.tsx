import * as React from "react";

interface Props {
  status: string | null;
}

const Status: React.FC<Props> = props => {
  return (
    <div className="movie-status movie-detail">
      <p>Status</p>
      <span>{props.status}</span>
    </div>
  );
};

export default Status;
