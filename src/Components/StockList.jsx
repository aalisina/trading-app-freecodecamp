import { useState, useEffect } from "react";
import finnhub from "../Apis/finnhub";

function StockList() {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const responses = [];
      try {
        const resp1 = await finnhub.get("/quote", {
          params: {
            symbol: "MSFT",
          },
        });
        responses.push(resp1);
        const resp2 = await finnhub.get("/quote", {
          params: {
            symbol: "GOOGL",
          },
        });
        responses.push(resp2);
        const resp3 = await finnhub.get("/quote", {
          params: {
            symbol: "AMZN",
          },
        });
        responses.push(resp3);

        console.log(responses);
        if (isMounted) {
          setStocks(responses);
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
