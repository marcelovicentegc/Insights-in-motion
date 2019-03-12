import * as React from "react";
import "./main.scss";

interface Props {
  message: string;
}

const Message: React.SFC<Props> = props => {
  return (
    <div className="message-wrapper">
      <div className="message">
        <p>{props.message}</p>
      </div>
    </div>
  );
};

export default Message;
