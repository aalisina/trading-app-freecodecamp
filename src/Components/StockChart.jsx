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
  // Determine which data set is selected and grap the last element and substract it from the first
  // one
  // const color =
  //   determineTimeFormat()[determineTimeFormat().length - 1].y -
  //     determineTimeFormat()[0].y >
  //   0
  //     ? "#26C281"
  //     : "#ed3419";
  const options = {
    // colors: [#ass], color can be specified in the options
    colors: ["#26C281"],
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
  const renderButtonSelect = (button) => {
    const classes = "btn m-1 ";
    if (button === dateFormat) {
      return classes + "btn-primary";
    } else {
      return classes + "btn-outline-primary";
    }
  };
  return (
    <div className="mt-5 p-4 shadow-sm bg-white">
      <Chart options={options} series={series} type="area" width="100%" />
      <div>
        <button
          className={renderButtonSelect("24h")}
          onClick={() => setDateFormat("24h")}
        >
          24h
        </button>
        <button
          className={renderButtonSelect("7d")}
          onClick={() => setDateFormat("7d")}
        >
          7d
        </button>
        <button
          className={renderButtonSelect("1y")}
          onClick={() => setDateFormat("1y")}
        >
          1y
        </button>
      </div>
    </div>
  );
}

export default StockChart;
