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
                if (loading) return null;
                return data.trending_movies.results
                  .slice(0, 10)
                  .map((result, i) => {
                    let posterUrl = baseUrl + posterSize + result.poster_path;
                    return <img key={i} src={posterUrl} />;
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
