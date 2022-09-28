import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockOverview from "./Components/StockOverview";
import StockDetail from "./Components/StockDetail";

function App() {
  return (
    <div className="App">
      <main>
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
