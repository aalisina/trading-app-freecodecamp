import { useState, useEffect } from "react";
import finnhub from "../Apis/finnhub";

function StockList() {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  const [stocks, setStocks] = useState();
  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const responses = Promise.all(
          finnhub.get("/quote", {
            params: {
              symbol: "MSFT",
            },
          }),
          finnhub.get("/quote", {
            params: {
              symbol: "GOOGL",
            },
          }),
          finnhub.get("/quote", {
            params: {
              symbol: "AMZN",
            },
          })
        );
        console.log(responses);

        if (isMounted) {
          console.log(responses);
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
