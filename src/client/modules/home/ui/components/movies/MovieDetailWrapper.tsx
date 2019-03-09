import * as React from "react";
import { Query } from "react-apollo";
import { getMovie } from "../../../../../../server/schema/graphql/Queries.graphql";
import {
  GetMovieQuery,
  GetMovieVariables
} from "../../../../../__types__/typeDefs";
import Loading from "../messages/Loading";
import NoData from "../messages/NoData";
import TypeInYourFavoriteMovie from "../messages/TypeIn";
import MovieDetail from "./MovieDetail";

interface Props {
  movieId: number;
  key?: number;
}

export default class MovieDetailWrapper extends React.Component<Props> {
  render() {
    console.log(this.props.movieId);
    return (
      <Query<GetMovieQuery, GetMovieVariables>
        query={getMovie}
        variables={{ id: this.props.movieId }}
      >
        {({ data, loading }) => {
          console.log(data);
          if (loading) return <Loading />;
          if (!data) return <NoData />;
          if (data.movie === null) return <TypeInYourFavoriteMovie />;
          return <MovieDetail movie={data.movie} />;
        }}
      </Query>
    );
  }
}
