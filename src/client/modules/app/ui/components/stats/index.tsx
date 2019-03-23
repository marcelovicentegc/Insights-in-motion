import { countBy, Dictionary, keysIn, valuesIn } from "lodash";
import React from "react";
import Query from "react-apollo/Query";
import { Redirect } from "react-router";
import {
  getMovie,
  getUser
} from "../../../../../../server/schema/graphql/Queries.graphql";
import {
  GetMovieQuery,
  GetMovieVariables,
  GetUserQuery
} from "../../../../../__types__/typeDefs";
import Nav from "../../../../main/ui/components/shared/Nav";
import Chart from "./Chart";
import "./main.scss";

export default class StatsView extends React.Component {
  render() {
    var genres: {
      [data: string]: { datasets: Array<number>; labels: Array<string> };
    } = {};
    genres.data = { datasets: [], labels: [] };
    let genreNames: Array<string> = [];
    let genreFreq: Dictionary<number> = {};
    let genreFreqStore: Array<Dictionary<number>> = [];

    const getData = () => {
      var lastFreqSet = genreFreqStore.pop();
      var keys = keysIn(lastFreqSet);
      var values = valuesIn(lastFreqSet);
      return {
        keys,
        values
      };
    };

    const gotDatasets = async () => {
      var datasets = new Promise((resolve, reject) => {
        window.setTimeout(() => {
          resolve(getData().values);
        }, 5000);
      });
      return datasets;
    };

    const gotLabels = async () => {
      var labels = new Promise((resolve, reject) => {
        window.setTimeout(() => {
          resolve(getData().keys);
        }, 5000);
      });
      return labels;
    };
    return (
      <>
        <Nav />
        <Query<GetUserQuery> query={getUser}>
          {({ data, loading }) => {
            if (loading) return null;
            if (!data) {
              return <Redirect to="/login" />;
            }
            return data.user.movies.map((movie, i) => {
              return (
                <Query<GetMovieQuery, GetMovieVariables>
                  query={getMovie}
                  variables={{ id: movie.movieId }}
                  key={i}
                >
                  {({ data, loading }) => {
                    if (loading) return null;

                    return data.movie.genres.map(genre => {
                      genreNames.push(genre.name);
                      genreFreq = countBy(genreNames);
                      genreFreqStore.push(genreFreq);
                      genres.data.datasets.push(genre.id);
                      genres.data.labels.push(genre.name);
                      return;
                    });
                  }}
                </Query>
              );
            });
          }}
        </Query>
        <Chart labelsPromise={gotLabels()} datasetsPromise={gotDatasets()} />
      </>
    );
  }
}
