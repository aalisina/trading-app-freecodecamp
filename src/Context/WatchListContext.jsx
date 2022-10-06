import { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(
    localStorage.getItem("watchList")?.split(",") || ["GOOGL", "MSFT", "AMZN"]
    // JSON.parse(localStorage.getItem("watchList")) || ["GOOGL", "MSFT", "AMZN"]
  );
  const addStock = (symbol) => {
    if (watchList.indexOf(symbol) === -1) {
      setWatchList([...watchList, symbol]);
    } else return;
  };

  useEffect(() => {
    localStorage.setItem("watchList", JSON.stringify(watchList));
  }, [watchList]);

  const deleteStock = (symbol) => {
    const modifiedList = watchList.filter((el) => el !== symbol);
    setWatchList(modifiedList);
  };

  const valuesObj = {
    watchList,
    addStock,
    deleteStock,
  };

  return (
    <WatchListContext.Provider value={valuesObj}>
      {props.children}
    </WatchListContext.Provider>
  );
};
