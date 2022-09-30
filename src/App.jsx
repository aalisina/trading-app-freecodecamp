import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import StockOverview from "./Pages/StockOverview";
import StockDetail from "./Pages/StockDetail";
import { WatchListContextProvider } from "./Context/WatchListContext";

function App() {
  return (
    <div className="App">
      <main className="container">
        <WatchListContextProvider>
          <Router>
            <Routes>
              <Route path="/" element={<StockOverview />} />
              <Route path="/detail/:symbol" element={<StockDetail />} />
            </Routes>
          </Router>
        </WatchListContextProvider>
      </main>
    </div>
  );
}

export default App;
