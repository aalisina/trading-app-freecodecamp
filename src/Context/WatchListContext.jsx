import { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);
  const addStock = (symbol) => {
    if (watchList.indexOf(symbol) === -1) {
      setWatchList([...watchList, symbol]);
    }
  };

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
