import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

// Reference : https://developers.google.com/chart/interactive/docs/gallery/timeline
const columns = [
  { type: "string", id: "Title" },
  { type: "datetime", id: "Start" },
  { type: "datetime", id: "End" }
];

const rows = [
  ["Heading 1", new Date(0), new Date(500)],
  ["Heading 2", new Date(500), new Date(1000)],
  ["Heading 3", new Date(1000), new Date(1500)]
];

const data = [columns, ...rows];

export default class chart extends React.Component {
  render() {
    return (
      <div className="App">
        <Chart
          chartType="Timeline"
          data={data}
          width="500px"
          height="400px"
          // controls={[
          //   {
          //     controlType: "DateRangeFilter",
          //     options: {
          //       filterColumnIndex: 1
          //     },
          //     controlPosition: "bottom"
          //   }
          // ]}
        />
      </div>
    );
  }
}
