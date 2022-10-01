import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";

function StockDetail() {
  const { symbol } = useParams();
  useEffect(() => {
    const fetchData = async () => {};
  }, []);
  return <h2>Stock details {symbol}</h2>;
}

export default StockDetail;
