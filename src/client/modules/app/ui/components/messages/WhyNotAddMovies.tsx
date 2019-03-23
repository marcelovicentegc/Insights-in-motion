import * as React from "react";
import Logo from "../../../../accounts/ui/components/shared/Logo";
import Message from "./Message";

const WhyNotAddMovies = () => {
  return (
    <div className="no-data-wrapper">
      <Message message="Why not add movies to your list?" />
      <Logo to="/app" title="Go to the app" icon="🎬" />
    </div>
  );
};

export default WhyNotAddMovies;
