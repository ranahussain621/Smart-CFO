import React, { Component } from "react";
import ReactApexChart from "react-apexcharts";
import series from "react-apexcharts";
class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series1: [
        {
          data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54],
        },
      ],
      options1: {
        chart: {
          type: "line",
          width: 100,
          height: 35,
          sparkline: {
            enabled: true,
          },
        },
        tooltip: {
          fixed: {
            enabled: false,
          },
          x: {
            show: false,
          },
          y: {
            title: {
              formatter: function (seriesName) {
                return "";
              },
            },
          },
          marker: {
            show: false,
          },
        },
      },
    };
  }

  render() {
    return (
      <div id="chart-5">
        <ReactApexChart
          options={this.state.options1}
          series={this.state.series1}
          type="bar"
          height={95}
          width={100}
        />
      </div>
    );
  }
}

export default ApexChart;
