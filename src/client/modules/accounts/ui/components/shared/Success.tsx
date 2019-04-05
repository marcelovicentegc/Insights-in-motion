import * as React from "react";

interface Props {
  message: string;
}

const Success: React.FC<Props> = props => {
  return (
    <div className="message success">
      <p>{props.message}</p>
    </div>
  );
};

export default Success;
