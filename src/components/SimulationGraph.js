import React from 'react';
import { Line } from 'react-chartjs-2';

class SimulationGraph extends React.Component {
  constructor(props) {
    super(props)
    this.data = this.data.bind(this);
  }

  colours = [ '#34225c', '#71286b', '#aa2d6c', '#db425f', '#fc6749', '#ff9729', '#ffcb00', '#e6ff1c' ]

  data() {
    return {
      labels: this.props.x,
      datasets: Object.keys(this.props.y).map(id => {
        return {
          label: this.props.configs[id].name,
          data: this.props.y[id],
          fill: false,
          pointRadius: 0,
          borderColor: this.colours[this.props.configs[id].num % this.colours.length]
        }
      })
    };
  }

  render() {
    return <Line data={this.data()} options={{
      title: {
        display: true,
        text: this.props.title,
        fontSize: 16
      },
      legend: {
        display: this.props.legend ? true : false
      },
      scales: {
        xAxes: [{
          display: true,
          ticks: { 
            callback: (v) => parseFloat(v.toFixed(5)),
            autoskip: true,
            maxTicksLimit: 10
          },
          scaleLabel: {
            display: true,
            labelString: this.props.xLabel
          }
        }],
        yAxes: [{
          display: true,
          label: { callback: (v) => parseFloat(v.toFixed(3)) },
          scaleLabel: {
            display: true,
            labelString: this.props.yLabel
          }
        }]
      },
      tooltips: {
        callbacks: { 
          title: (i, v) => this.props.xLabel + ": " + parseFloat(parseFloat(i[0].xLabel).toFixed(5))
        }
      }
    }} />
  }
}

export default SimulationGraph;