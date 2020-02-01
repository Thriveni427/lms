import React, { Component } from 'react'
import Chart from "react-google-charts";

const data = [
  ["Element", "Revenue", { role: "style" }],
  ["JAN", 8.94, "#ff9d76"], // RGB value
  ["MAR", 10.49, "#ff9d76"], // English color name
  ["APR", 11.3, "#ff9d74"],
  ["MAY", 12.3, "#ff9d76"],
  ["JUN", 13.3, "#ff9d76"],
  ["JUL", 14.3, "#ff9d76"],
  ["AUG", 15.3, "#ff9d76"],
  ["SEP", 16.3, "#ff9d76"],
  ["OCT", 17.3, "#ff9d76"],
  ["NOV", 18.3, "#ff9d76"],
  ["DEC", 19.45, "color: #ff9d76"] // CSS-style declaration
];

function genreport(){
    let x = 10;
    return function add(y){
      return x + y
    }
}
let generatedReport = genreport()
console.log(generatedReport(10))

export default class CourseRevenue extends Component {
  render() {
    return (
      <div>
        <Chart
          chartType="ColumnChart"
          width="100%"
          height="500px"
          data={data}
          options={{
            chartArea: { width: '100%' }
          }}
        />
      </div>
    )
  }
}
