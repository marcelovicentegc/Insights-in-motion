import * as React from "react";
import {
  GetMoviesMovies,
  GetUserUser
} from "../../../../../../__types__/typeDefs";
import AddMovieToListBtn from "./AddMovieToListBtn";
import RemoveMovieFromListBtn from "./RemoveMovieFromListBtn";

interface Props {
  userMovies: Array<number>;
  movie: GetMoviesMovies;
  user: GetUserUser;
}

const AddOrRemoveMovieWrapper: React.FC<Props> = props => {
  return props.userMovies.find(userMovie => userMovie === props.movie.id) ? (
    <RemoveMovieFromListBtn movie={props.movie} />
  ) : (
    <AddMovieToListBtn movie={props.movie} user={props.user} />
  );
};

export default AddOrRemoveMovieWrapper;
