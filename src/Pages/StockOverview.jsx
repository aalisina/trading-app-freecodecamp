import React from "react";
import AutoComplete from "../Components/AutoComplete";
import StockList from "../Components/StockList";

function StockOverview() {
  return (
    <div>
      <h1>Stock Overview Page</h1>
      <AutoComplete />
      <StockList />
    </div>
  );
}

export default StockOverview;
