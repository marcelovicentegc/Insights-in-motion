import * as React from "react";

interface Props {
  message: string;
}

const Error: React.FC<Props> = props => {
  return (
    <div className="message error">
      <p>{props.message}</p>
    </div>
  );
};

export default Error;
