import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockOverview from "./Pages/StockOverview";
import StockDetail from "./Pages/StockDetail";

function App() {
  return (
    <div className="App">
      <main className="container">
        <Router>
          <Routes>
            <Route path="/" element={<StockOverview />} />
            <Route path="/detail/:symbol" element={<StockDetail />} />
          </Routes>
        </Router>
      </main>
    </div>
  );
}

export default App;
