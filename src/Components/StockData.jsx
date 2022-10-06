import { useState, useEffect } from "react";
import finnhub from "../Apis/finnhub";

function StockData({ symbol }) {
  const [stockData, setStockData] = useState();
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const response = await finnhub.get("/stock/profile2", {
          params: {
            symbol,
          },
        });
        if (isMounted) {
          setStockData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
    return () => (isMounted = false);
  }, [symbol]);
  return <h1>Ba</h1>;
}

export default StockData;
