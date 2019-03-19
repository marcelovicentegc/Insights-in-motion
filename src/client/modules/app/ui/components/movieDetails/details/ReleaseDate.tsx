import * as React from "react";

interface Props {
  release_date: string | null;
}

const formatDate = (releasedDate: string) => {
  let year = releasedDate.slice(0, 4);
  let month = releasedDate.slice(5, 7);
  let day = releasedDate.slice(8, 10);
  let formattedDate = month + "/" + day + "/" + year;
  return formattedDate;
};

const ReleaseDate: React.FC<Props> = props => {
  return (
    <div className="movie-release-date movie-detail">
      <p>
        <span>
          <b>Release date</b>: {formatDate(props.release_date)}
        </span>
      </p>
    </div>
  );
};

export default ReleaseDate;
