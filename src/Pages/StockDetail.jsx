import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import finnhub from "../Apis/finnhub";

const formatData = (data) => {
  return data.t.map((el, index) => {
    return {
      x: el * 1000,
      y: data.c[index],
    };
  });
};

function StockDetail() {
  const { symbol } = useParams();
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const date = new Date();
      // Divide by 1000 to get in seconds
      const curTimeSeconds = Math.floor(date.getTime() / 1000);
      let oneDayAgo;
      //if saturday
      if (date.getDay() === 6) {
        oneDayAgo = curTimeSeconds - 60 * 60 * 24 * 2;
        //if sunday
      } else if (date.getDay() === 0) {
        oneDayAgo = curTimeSeconds - 60 * 60 * 24 * 3;
      } else {
        oneDayAgo = curTimeSeconds - 60 * 60 * 24;
      }
      const oneWeekAgo = curTimeSeconds - 60 * 60 * 24 * 7;
      const oneYearAgo = curTimeSeconds - 60 * 60 * 24 * 365;
      try {
        const responses = await Promise.all([
          finnhub.get("/stock/candle", {
            params: {
              symbol,
              from: oneDayAgo,
              to: curTimeSeconds,
              resolution: 30,
            },
          }),
          finnhub.get("/stock/candle", {
            params: {
              symbol,
              from: oneWeekAgo,
              to: curTimeSeconds,
              resolution: 60,
            },
          }),
          finnhub.get("/stock/candle", {
            params: {
              symbol,
              from: oneYearAgo,
              to: curTimeSeconds,
              resolution: "W",
            },
          }),
        ]);
        setChartData({
          day: formatData(responses[0].data),
          week: formatData(responses[1].data),
          year: formatData(responses[2].data),
        });
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [symbol]);
  return <h2>Stock details {symbol}</h2>;
}

export default StockDetail;

// We want to manipulate the data to store it in the chartData state as following
//
// const chartData = {
//     day: ['Data for one day']
//     week: ['Data for one week']
//     year: ['Data for one year']
//       }
//
// The data for each item in the object will have the following structure
//
// const data = [{x: 'some value', y: 'other value'},{x: 'some value', y: 'other value'}]
