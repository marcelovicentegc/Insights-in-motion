import * as React from "react";

interface Props {
  revenue: number | null;
}

export const Revenue: React.FC<Props> = props => {
  return (
    <div className="movie-revenue movie-detail">
      <p>
        <span>
          <b>Revenue</b>: $
          {props.revenue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")}
        </span>
      </p>
    </div>
  );
};
