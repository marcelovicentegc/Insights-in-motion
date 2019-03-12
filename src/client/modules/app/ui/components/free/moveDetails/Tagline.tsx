import * as React from "react";
import Message from "../../messages/Message";

interface Props {
  tagline: string | null;
}

const Tagline: React.FC<Props> = props => {
  return <Message message={props.tagline} />;
};

export default Tagline;
