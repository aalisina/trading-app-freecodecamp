import React from "react";
import AutoComplete from "../Components/AutoComplete";
import StockList from "../Components/StockList";

function StockOverview() {
  return (
    <div>
      <AutoComplete />
      <StockList />
    </div>
  );
}

export default StockOverview;
