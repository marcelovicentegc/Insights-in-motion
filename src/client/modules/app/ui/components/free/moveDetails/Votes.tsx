import * as React from "react";

interface Props {
  vote_average: string;
  vote_count: number;
}

const Votes: React.FC<Props> = props => {
  return (
    <div className="movie-votes movie-detail">
      <p>
        <span>
          {props.vote_count} voters classifed this movie as {props.vote_average}
          /10
        </span>
      </p>
    </div>
  );
};

export default Votes;
