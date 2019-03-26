import * as React from "react";
import Query from "react-apollo/Query";
import { getMovie } from "../../../../../../server/schema/graphql/Queries.graphql";
import {
  GetMovieQuery,
  GetMovieVariables
} from "../../../../../__types__/typeDefs";
import { Loading, NoData, TypeInYourFavoriteMovie } from "../messages/index";
import MovieDetails from "./MovieDetails";

interface Props {
  movieId: number;
  key?: number;
  withALoggedInUser: boolean;
}

export default class MovieDetailsWrapper extends React.Component<Props> {
  render() {
    return (
      <>
        <Query<GetMovieQuery, GetMovieVariables>
          query={getMovie}
          variables={{ id: this.props.movieId }}
        >
          {({ data, loading }) => {
            if (loading) return <Loading />;
            if (!data) return <NoData />;
            if (data.movie === null) return <TypeInYourFavoriteMovie />;
            return (
              <MovieDetails
                movie={data.movie}
                withALoggedInUser={this.props.withALoggedInUser}
                withRegisteredUserLenses={false}
              />
            );
          }}
        </Query>
      </>
    );
  }
}
