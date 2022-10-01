import { useParams } from "react-router-dom";

function StockDetail() {
  const { symbol } = useParams();
  return <h2>Stock details {symbol}</h2>;
}

export default StockDetail;
