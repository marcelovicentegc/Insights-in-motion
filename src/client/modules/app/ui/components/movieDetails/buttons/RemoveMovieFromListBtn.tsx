import * as React from "react";
import { Mutation } from "react-apollo";
import { dettachMovie } from "../../../../../../../server/schema/graphql/Mutations.graphql";
import { getUser } from "../../../../../../../server/schema/graphql/Queries.graphql";
import {
  DettachMovieMutation,
  DettachMovieVariables,
  GetMoviesMovies
} from "../../../../../../__types__/typeDefs";

interface Props {
  movie: GetMoviesMovies;
}

const RemoveMovieFromListBtn: React.FC<Props> = props => {
  return (
    <Mutation<DettachMovieMutation, DettachMovieVariables>
      mutation={dettachMovie}
      refetchQueries={[{ query: getUser }]}
      awaitRefetchQueries={true}
    >
      {mutate => (
        <button
          className="remove-movie-from-list"
          title="Click to remove this movie from your list"
          onClick={async () => {
            await mutate({
              variables: {
                movieId: props.movie.id
              }
            });
          }}
        >
          -
        </button>
      )}
    </Mutation>
  );
};

export default RemoveMovieFromListBtn;
