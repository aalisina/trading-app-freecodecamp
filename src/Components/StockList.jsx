import { useState, useEffect } from "react";
import finnhub from "../Apis/finnhub";

function StockList() {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  const [stocks, setStocks] = useState([]);
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = await Promise.all(
          watchList.map((stock) => {
            return finnhub.get("/quote", {
              params: {
                symbol: stock,
              },
            });
          })
        );
        const modifiedResponses = responses.map((stock) => {
          return {
            data: stock.data,
            symbol: stock.config.params.symbol,
          };
        });
        console.log(modifiedResponses);
        if (isMounted) {
          setStocks(responses);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    // When the component gets unmounted
    return () => (isMounted = false);
  }, []);

  return <h3>Stock List</h3>;
}

export default StockList;
