import * as React from "react";

interface Props {
  vote_average: string | null;
  vote_count: number | null;
  popularity: string | null;
}

const votesController = (voteCount: number) => {
  if (voteCount === 0) return "No one rated this movie yet 🙂";
  if (voteCount === 1) return "voter classifed this movie with";
  else {
    `${voteCount} voters classifed this movie with`;
  }
};

const articleDefiner = (voteAverage: string) => {
  if (voteAverage.charAt(0) === "8") return "an";
  else {
    return "a";
  }
};

const Votes: React.FC<Props> = props => {
  return (
    <div className="movie-votes movie-detail">
      <p>
        <span>
          {props.vote_count} voters classifed this movie with
          {articleDefiner(props.vote_average)} {props.vote_average} out of 10
        </span>
      </p>
      <p>
        <span>
          <b>Popularity</b>: {props.popularity}
        </span>
      </p>
    </div>
  );
};

export default Votes;
