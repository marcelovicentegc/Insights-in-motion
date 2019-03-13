import * as React from "react";

interface Props {
  release_date: string | null;
}

const ReleaseDate: React.FC<Props> = props => {
  return (
    <div className="movie-release-date movie-detail">
      <p>
        <span>
          <b>Release date</b>: {props.release_date}
        </span>
      </p>
    </div>
  );
};

export default ReleaseDate;
