import * as bluebird from "bluebird";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { Loading } from "../messages";

interface Props {
  labelsPromise: Promise<{}>;
  datasetsPromise: Promise<{}>;
}

interface State {
  labelPromiseIsResolved: boolean;
  datasetPromiseIsResolved: boolean;
  labels: Array<string>;
  dataset: Array<number>;
}

export default class Chart extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      labelPromiseIsResolved: false,
      datasetPromiseIsResolved: false,
      labels: [],
      dataset: []
    };
  }

  componentDidMount() {
    var wrappedLabelsPromise = bluebird.Promise.resolve(
      this.props.labelsPromise
    );

    var wrappedDatasetPromise = bluebird.Promise.resolve(
      this.props.datasetsPromise
    );

    wrappedLabelsPromise.then(labels => {
      if (wrappedLabelsPromise.isResolved()) {
        this.setState(() => ({
          labelPromiseIsResolved: true,
          labels: labels.toString().split(",")
        }));
      } else {
        null;
      }
    });

    wrappedDatasetPromise.then(dataset => {
      if (wrappedDatasetPromise.isResolved()) {
        this.setState(() => ({
          datasetPromiseIsResolved: true,
          dataset: dataset
            .toString()
            .split(",")
            .map(Number)
        }));
      } else {
        null;
      }
    });
  }

  render() {
    return (
      <div className="chart-wrapper">
        {this.state.labelPromiseIsResolved === true &&
        this.state.datasetPromiseIsResolved === true ? (
          <Doughnut
            data={{
              labels: this.state.labels,
              datasets: [
                {
                  label: "Genres pie",
                  data: this.state.dataset,
                  borderWidth: 1
                }
              ]
            }}
            options={{
              responsive: true,
              maintainAspectRatio: false
            }}
          />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}
