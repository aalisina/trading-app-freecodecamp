import { createContext, useState, useEffect } from "react";

export const WatchListContext = createContext();

let initialState;

try {
  initialState = JSON.parse(localStorage.getItem("watchList"));
} catch (err) {
  console.log(err);
  initialState = ["GOOGL", "MSFT", "AMZN"];
}

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(
    // localStorage.getItem("watchList")?.split(",") || ["GOOGL", "MSFT", "AMZN"]
    initialState || ["GOOGL", "MSFT", "AMZN"]
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
