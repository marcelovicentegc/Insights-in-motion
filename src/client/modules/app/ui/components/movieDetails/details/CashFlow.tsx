import * as React from "react";

interface Props {
  budget: number | null;
  revenue: number | null;
}

const CashFlow: React.FC<Props> = props => {
  return (
    <div className="movie-cash-flow movie-detail">
      <p>
        <span>
          <b>Budget</b>: $
          {props.budget !== null
            ? props.budget.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
            : null}
        </span>
      </p>
      <p>
        <span>
          <b>Revenue</b>: $
          {props.revenue !== null
            ? props.revenue.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,")
            : null}
        </span>
      </p>
    </div>
  );
};

export default CashFlow;
