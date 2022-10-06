import { useState } from "react";
import Chart from "react-apexcharts";

function StockChart({ chartData, symbol }) {
  const { day, week, year } = chartData;
  const [dateFormat, setDateFormat] = useState("24h");
  const determineTimeFormat = () => {
    switch (dateFormat) {
      case "24h":
        return day;
      case "7d":
        return week;
      case "1y":
        return year;
      default:
        return day;
    }
  };
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
      labels: {
        dateTimeUTC: false,
      },
    },
    tooltip: {
      x: {
        format: "MMM dd HH:MM",
      },
    },
  };
  const series = [
    {
      name: symbol,
      data: determineTimeFormat(),
    },
  ];
  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      <Chart options={options} series={series} type="area" width="100%" />
      <div>
        <button onClick={() => setDateFormat("24h")}>24h</button>
        <button onClick={() => setDateFormat("7d")}>7d</button>
        <button onClick={() => setDateFormat("1y")}>1y</button>
      </div>
    </div>
  );
}

export default StockChart;
