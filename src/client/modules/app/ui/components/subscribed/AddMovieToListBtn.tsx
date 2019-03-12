import * as React from "react";
import { Mutation } from "react-apollo";
import { appendMovie } from "../../../../../../server/schema/graphql/Mutations.graphql";
import { getUser } from "../../../../../../server/schema/graphql/Queries.graphql";
import {
  AppendMovieMutation,
  AppendMovieVariables,
  GetMoviesMovies,
  GetUserUser
} from "../../../../../__types__/typeDefs";

interface Props {
  movie: GetMoviesMovies;
  user: GetUserUser;
}

const AddMovieToListBtn: React.FC<Props> = props => {
  return (
    <Mutation<AppendMovieMutation, AppendMovieVariables>
      mutation={appendMovie}
      refetchQueries={[{ query: getUser }]}
      awaitRefetchQueries={true}
    >
      {mutate => (
        <button
          className="add-movie-to-list"
          title="Click to add this movie to your list"
          onClick={async () => {
            await mutate({
              variables: {
                movieId: props.movie.id,
                userId: props.user.id
              }
            });
          }}
        >
          +
        </button>
      )}
    </Mutation>
  );
};

export default AddMovieToListBtn;
