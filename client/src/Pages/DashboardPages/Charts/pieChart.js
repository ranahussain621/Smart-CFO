import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts'

class Pie extends Component {

  constructor(props) {
    super(props);

    this.state = {
      options: {},
      series: [44, 55, 41],
      labels: ['A', 'B', 'C']
    }
  }

  render() {

    return (
      <div id="chart">
      <ReactApexChart options={this.state.options} series={this.state.series} type="pie" width={360} />
    </div>
    );
  }
}

export default Pie;