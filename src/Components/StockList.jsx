import { useState, useEffect } from "react";
import finnhub from "../Apis/finnhub";
import { BsFillCaretDownFill, BsFillCaretUpFill } from "react-icons/bs";

function StockList() {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  const [stocks, setStocks] = useState([]);

  const changeColor = (data) => {
    return data > 0 ? "success" : "danger";
  };

  const renderIcon = (data) => {
    return data > 0 ? <BsFillCaretUpFill /> : <BsFillCaretDownFill />;
  };

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
          setStocks(modifiedResponses);
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
    // When the component gets unmounted
    return () => (isMounted = false);
  }, []);

  return (
    <div>
      <table className="table hover mt-5">
        <thead style={{ color: "rgb(79,89,102)" }}>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Change</th>
            <th scope="col">Change%</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
            <th scope="col">Open</th>
            <th scope="col">Pclose</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => {
            return (
              <tr className="table-row" key={stock.symbol}>
                <th scope="row">{stock.symbol}</th>
                <td>{stock.data.c}</td>
                <td className={`text-${changeColor(stock.data.d)}`}>
                  {stock.data.d} {renderIcon(stock.data.d)}
                </td>
                <td className={`text-${changeColor(stock.data.dp)}`}>
                  {stock.data.dp}
                </td>
                <td>{stock.data.h}</td>
                <td>{stock.data.l}</td>
                <td>{stock.data.o}</td>
                <td>{stock.data.pc}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default StockList;
