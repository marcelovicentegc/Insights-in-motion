import * as React from "react";

interface Props {
  runtime: number | null;
}

const timeConverter = (runtime: number) => {
  const hours = Math.floor(runtime / 60);
  const minutes = runtime % 60;
  return `${hours}h ${minutes}min`;
};

const Runtime: React.FC<Props> = props => {
  return (
    <div className="movie-runtime movie-detail">
      <p>Runtime</p>
      <span>{timeConverter(props.runtime)}</span>
    </div>
  );
};

export default Runtime;
