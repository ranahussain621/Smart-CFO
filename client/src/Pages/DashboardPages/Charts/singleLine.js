import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts'
import series from 'react-apexcharts'
class ApexChart extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    
        series2: [{
            data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
          }],
          options2: {
            chart: {
              type: 'line',
              width: 100,
              height: 35,
              sparkline: {
                enabled: true
              }
            },
            tooltip: {
              fixed: {
                enabled: false
              },
              x: {
                show: false
              },
              y: {
                title: {
                  formatter: function (seriesName) {
                    return ''
                  }
                }
              },
              marker: {
                show: false
            },
      
      
        }
      }
    };
}

  

    render() {
      return (
        

        <div id="chart-2">
        <ReactApexChart options={this.state.options2} series={this.state.series2} type="line" height={35} width={100} />
      </div>
    );
  }
}

export default ApexChart;