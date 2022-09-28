import { useState, useEffect } from "react";
import finnhub from "../Apis/finnhub";

function StockList() {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const resp = await finnhub.get("/quote", {
          params: {
            symbol: "MSFT",
          },
        });
        console.log(resp);
        if (isMounted) {
          setStocks(resp.data);
        }
      } catch (error) {}
    };

    fetchData();
    // When the component gets unmounted
    return () => (isMounted = false);
  }, []);

  return <h3>Stock List</h3>;
}

export default StockList;
