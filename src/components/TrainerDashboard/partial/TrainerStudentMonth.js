import React, { Component } from 'react'
import Plot from 'react-plotly.js';
export default class TrainerStudentMonth extends Component {
  render() {
    return (
      <div>
      <Plot
        data={[
          {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+points',
            marker: {color: 'orange'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout = {
          {
          grid: {width: '80%', height: '100%'},
          showlegend: false,
        }}
      />
      </div>
    )
  }
}