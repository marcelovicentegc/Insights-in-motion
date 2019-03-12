import * as React from "react";

interface Props {
  release_date: string | null;
}

const ReleaseDate: React.FC<Props> = props => {
  return (
    <div className="movie-release-date movie-detail">
      <p>Release date</p>
      <p>
        <span>{props.release_date}</span>
      </p>
    </div>
  );
};

export default ReleaseDate;
