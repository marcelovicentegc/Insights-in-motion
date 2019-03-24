import * as React from "react";
import { Query } from "react-apollo";
import {
  getConfig,
  getTrendingMovies
} from "../../../../../../../server/schema/graphql/Queries.graphql";
import {
  GetConfigQuery,
  GetTrendingMoviesQuery
} from "../../../../../../__types__/typeDefs";
import { Loading } from "../../../../../app/ui/components/messages";
import "./main.scss";

const FloatingPosters = () => {
  return (
    <div className="floating-posters">
      <Query<GetConfigQuery> query={getConfig}>
        {({ data, loading }) => {
          if (loading) return null;
          let baseUrl = data.config.images.secure_base_url;
          let posterSize = data.config.images.poster_sizes[0];
          return (
            <Query<GetTrendingMoviesQuery> query={getTrendingMovies}>
              {({ data, loading }) => {
                if (loading) return <Loading />;
                return data.trending_movies.results.slice(0, 10).map(result => {
                  let posterUrl = baseUrl + posterSize + result.poster_path;
                  return <img src={posterUrl} />;
                });
              }}
            </Query>
          );
        }}
      </Query>
    </div>
  );
};

export default FloatingPosters;
