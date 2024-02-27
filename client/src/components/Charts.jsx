import React, { useState } from "react";
import Chart from "react-apexcharts";
const Charts = (props) => {
  const [data, setData] = useState({
    series: props.series,
    options: {
      chart: { type: "area", toolbar: { show: true } },
      // markers: { size: 1 },
      colors: ["#2A9DF4", "#00B4D8", "#0044FF"],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityForm: 0.1,
          opacityTo: 1,
          stops: [0, 90, 100],
        },
      },
      dataLabels: {
        enabled: false, // <--- HERE
      },
      stroke: { curve: "smooth", width: 1 },
      xaxis: {
        labels: { show: false },
        type: "datetime",
        categories: [
          "2024-01-13T05:57:19.523Z",
          "2024-01-13T06:57:19.523Z",
          "2024-01-13T07:57:19.523Z",
          "2024-01-13T08:57:19.523Z",
          "2024-01-13T09:57:19.523Z",
          "2024-01-13T010:57:19.523Z",
          "2024-01-13T011:57:19.523Z",
        ],
      },
      grid: {
        xaxis: {
          lines: {
            show: false,
          },
        },
        yaxis: {
          lines: {
            show: false,
          },
        },
      },
      tooltip: {
        x: { format: "dd/MM/yy HH:mm" },
      },
    },
  });
  return (
    <Chart
      options={data.options}
      series={data.series}
      type={props.type}
      height={props.height}
    />
  );
};

export default Charts;
