import React, { useState } from "react";
import Chart from "react-apexcharts";
const SmallChart = (props) => {
  const [data, setData] = useState({
    series: props.series,
    options: {
      chart: { type: "area", toolbar: { show: false }, parentHeightOffset: 0 },
      // markers: { size: 4 },
      colors: [props.color],
      fill: {
        type: "gradient",
        gradient: {
          shadeIntensity: 1,
          opacityForm: 0.1,
          opacityTo: 0.8,
          stops: [0, 90, 100],
        },
      },
      dataLabels: { enabled: false },
      stroke: { width: 3 },
      yaxis: {
        tickAmount: 3,
        show: false,
        labels: {
          show: false,
          offsetX: -25,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
        crosshairs: {
          show: false,
        },
        tooltip: {
          enabled: false,
        },
      },
      xaxis: {
        show: false,
        labels: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      grid: {
        padding: {
          left: -5,
          top: 0,
        },
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
      markers: props.markers,
      // tooltip: { enabled: true },
      labels: { show: false },
      tooltip: {
        show: false,
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

export default SmallChart;
