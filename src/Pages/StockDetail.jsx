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
      const oneDayAgo = curTimeSeconds - 60 * 60 * 24;
      const oneWeekAgo = curTimeSeconds - 60 * 60 * 24 * 7;
      const oneYearAgo = curTimeSeconds - 60 * 60 * 24 * 365;
      const response = await finnhub.get("/stock/candle", {
        params: {
          symbol,
          from: oneDayAgo,
          to: curTimeSeconds,
          resolution: 30,
        },
      });
      console.log(response);
    };
    fetchData();
  }, []);
  return <h2>Stock details {symbol}</h2>;
}

export default StockDetail;
