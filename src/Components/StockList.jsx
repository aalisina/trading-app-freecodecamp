import { useState, useEffect } from "react";
import finnhub from "../Apis/finnhub";

const TOKEN = process.env.REACT_APP_FINNHUB_API_KEY;

function StockList() {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await finnhub.get(`/quote?symbol=MSFT&token=${TOKEN}`);
        console.log(resp);
      } catch (error) {}
    };

    fetchData();
  }, []);

  return <h3>Stock List</h3>;
}

export default StockList;
