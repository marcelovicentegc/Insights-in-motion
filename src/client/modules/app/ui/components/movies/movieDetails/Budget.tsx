import * as React from "react";

interface Props {
  budget: number | null;
}

export const Budget: React.FC<Props> = props => {
  return (
    <div className="movie-budget movie-detail">
      <p>
        <span>
          <b>Budget</b>: $
          {props.budget.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        </span>
      </p>
    </div>
  );
};
