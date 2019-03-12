import * as React from "react";
import Message from "./Message";

interface Props {
  results: number;
}

const NumberOfResults: React.SFC<Props> = props => {
  return props.results > 1 ? (
    <Message message={`Displaying ${props.results} results 🖖`} />
  ) : (
    <Message message={`Displaying ${props.results} result 🖖`} />
  );
};

export default NumberOfResults;
