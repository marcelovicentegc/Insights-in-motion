import * as React from "react";

interface Props {
  popularity: string | null;
}

const Popularity: React.FC<Props> = props => {
  return (
    <div className="movie-popularity movie-detail">
      <p>Popularity</p>
      <p>
        <span>{props.popularity}</span>
      </p>
    </div>
  );
};

export default Popularity;
