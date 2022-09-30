import { useState, useEffect } from "react";
import finnhub from "../Apis/finnhub";

function AutoComplete() {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  const renderDropdown = () => {
    const dropDownClass = search ? "show" : null;
    return (
      <ul className={`dropdown-menu ${dropDownClass}`}>
        {results.map((stock) => {
          return (
            <li className="dropdown-item" key={stock.symbol}>
              {stock.description} ({stock.symbol})
            </li>
          );
        })}
      </ul>
    );
  };

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const { data } = await finnhub.get("/search", {
          params: {
            q: search,
          },
        });
        console.log(data);
        if (isMounted) {
          setResults(data.result);
        }
      } catch (error) {
        console.error(error);
      }
    };
    if (search.length > 0) {
      fetchData();
    } else {
      // Without this the state doesn't get updated if we empty the search field after a search
      setResults([]);
    }
    return () => (isMounted = false);
  }, [search]);

  return (
    <div className="w-50 p-5 rounded mx-auto">
      <div className="form-floating dropdown">
        <input
          type="text"
          style={{ backgroundColor: "rgba(145, 158, 171, 0.04)" }}
          id="search"
          className="form-control"
          placeholder="Search"
          autoComplete="off"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <label htmlFor="search">Search</label>
        {renderDropdown()}
        {/* When you assign the classname of dropdown-menu, bootstrap automatically gives it a display
        of none, so it won't be visible. If we want to show it, we add the class show to it 
                <ul className="dropdown-menu show">
        */}
        {/* <ul className="dropdown-menu show">
          <li>Stock1</li>
          <li>Stock2</li>
          <li>Stock3</li>
          <li>Stock4</li>
        </ul> */}
      </div>
    </div>
  );
}

export default AutoComplete;
