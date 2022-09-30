import { useState, useEffect } from "react";
import finnhub from "../Apis/finnhub";

function AutoComplete() {
  const [search, setSearch] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await finnhub.get("/search", {
          params: {
            q: search,
          },
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };
    if (search.length > 0) {
      fetchData();
    }
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
        {/* When you assign the classname of dropdown-menu, bootstrap automatically gives it a display
        of none, so it won't be visible. If we want to show it, we add the class show to it 
                <ul className="dropdown-menu show">
        */}
        <ul className="dropdown-menu">
          <li>Stock1</li>
          <li>Stock2</li>
          <li>Stock3</li>
          <li>Stock4</li>
        </ul>
      </div>
    </div>
  );
}

export default AutoComplete;
