import React from "react";
import Chart from "react-apexcharts";

function StockChart({ chartData, symbol }) {
  const { day, week, year } = chartData;
  const options = {
    title: {
      text: symbol,
      align: "center",
      style: {
        fontSize: "24px",
      },
    },
    chart: {
      id: symbol,
      animations: {
        speed: 1300,
      },
    },
    xaxis: {
      type: "datetime",
    },
  };
  const series = [
    {
      name: symbol,
      data: day,
    },
  ];
  return <div></div>;
}

export default StockChart;
