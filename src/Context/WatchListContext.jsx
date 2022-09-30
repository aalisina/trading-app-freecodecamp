import { createContext, useState } from "react";

export const WatchListContext = createContext();

export const WatchListContextProvider = (props) => {
  const [watchList, setWatchList] = useState(["GOOGL", "MSFT", "AMZN"]);

  const valuesObj = {
    watchList,
    // addStock,
    // deleteStock,
  };

  return (
    <WatchListContext.Provider value={valuesObj}>
      {props.children}
    </WatchListContext.Provider>
  );
};
