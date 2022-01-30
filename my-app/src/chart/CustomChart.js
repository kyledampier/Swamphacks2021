import React from "react";
import ReactDOM from "react-dom";
import Chart from "react-google-charts";

// Reference : https://developers.google.com/chart/interactive/docs/gallery/timeline
const columns = [
  { type: "string", id: "Gist" },
  { type: "string", id: "Headline" },
  { type: "string", id: "Summary", role: "tooltip" },
  { type: "datetime", id: "Start" },
  { type: "datetime", id: "End" },
];

export default function CustomChart(props) {
  
  let data = [];
  data.push(columns);

  for (let i = 1; i < props.timelineData.length + 1; i++) {
    let a = i - 1;
    let temp = [
      props.timelineData[a]['headline'],
      props.timelineData[a]['gist'],
      "<b>" + props.timelineData[a]['headline'] + "</b> <br>" + props.timelineData[a]['summary'],
      new Date(0,0,0,0,0,0,props.timelineData[a]['start']).getTime(),
      new Date(0,0,0,0,0,0,props.timelineData[a]['end']).getTime(),
    ];
    data.push(temp);
  }

  return (
    <Chart
      chartType="Timeline"
      data={data}
      width="100%"
      height="450px"
      options={{ 
        timeline: {
          groupByRowLabel: true,
          showRowLabels: false,
          rowLabelStyle: {
            fontSize: 14,
          },
        },
        hAxis: {
          format: "HH:mm:ss",
          gridlines: {count: 15}
        },
        backgroundColor: '#fff',
        chartArea: {
          width: "100%",
          height: "90%",
        },
      }}
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
  );
}
