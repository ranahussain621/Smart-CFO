import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts'

class ApexChart extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
      
        series8: [53, 67],
        options8: {
          chart: {
            type: 'radialBar',
            width: 40,
            height: 40,
            sparkline: {
              enabled: true
            }
          },
          dataLabels: {
            enabled: false
          },
          plotOptions: {
            radialBar: {
              hollow: {
                margin: 0,
                size: '50%'
              },
              track: {
                margin: 1
              },
              dataLabels: {
                show: false
              }
            }
          }
        },
      
      
      };
    }
    render() {

        return (
            <div id="card">
            <div id="chart">
            <div id="chart-8">
  <ReactApexChart options={this.state.options8} series={this.state.series8} type="radialBar" height={150} width={150} />
</div>
          </div>
          </div>
        );
      }
    }

export default ApexChart;