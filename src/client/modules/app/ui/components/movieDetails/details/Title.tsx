import * as React from "react";

interface Props {
  title: string | null;
}

const Title: React.FC<Props> = props => {
  return (
    <div className="movie-title movie-detail">
      <p>{props.title}</p>
    </div>
  );
};

export default Title;
