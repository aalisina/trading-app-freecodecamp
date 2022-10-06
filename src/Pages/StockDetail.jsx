import { useParams } from "react-router-dom";
import { useEffect } from "react";
import finnhub from "../Apis/finnhub";

function StockDetail() {
  const { symbol } = useParams();
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
      const responses = Promise.all([
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
      console.log(responses);
    };
    fetchData();
  }, []);
  return <h2>Stock details {symbol}</h2>;
}

export default StockDetail;
