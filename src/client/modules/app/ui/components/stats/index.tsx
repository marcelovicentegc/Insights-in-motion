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

interface Props {}

export default class StatsView extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  genres: {
    [data: string]: {
      datasets: Array<number>;
      labels: Array<string>;
    };
  } = {};
  genreNames: Array<string> = [];
  genreFreq: Dictionary<number> = {};
  genreFreqStore: Array<Dictionary<number>> = [];

  getData = () => {
    var lastFreqSet = this.genreFreqStore.pop();
    var keys = keysIn(lastFreqSet);
    var values = valuesIn(lastFreqSet);
    return {
      keys,
      values
    };
  };

  gotDatasets = async () => {
    var datasets = new Promise((resolve, reject) => {
      window.setTimeout(() => {
        resolve(this.getData().values);
      }, 5000);
    });
    return datasets;
  };

  gotLabels = async () => {
    var labels = new Promise((resolve, reject) => {
      window.setTimeout(() => {
        resolve(this.getData().keys);
      }, 5000);
    });
    return labels;
  };

  render() {
    this.genres.data = { datasets: [], labels: [] };
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
                    if (data.movie.genres !== null) {
                      return data.movie.genres.map(genre => {
                        this.genreNames.push(genre.name);
                        this.genreFreq = countBy(this.genreNames);
                        this.genreFreqStore.push(this.genreFreq);
                        this.genres.data.datasets.push(genre.id);
                        this.genres.data.labels.push(genre.name);
                        return;
                      });
                    } else {
                      return null;
                    }
                  }}
                </Query>
              );
            });
          }}
        </Query>
        <Chart
          labelsPromise={this.gotLabels()}
          datasetsPromise={this.gotDatasets()}
        />
      </>
    );
  }
}
