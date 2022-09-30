import React from "react";

function AutoComplete() {
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
        />
        <label htmlFor="search">Search</label>
      </div>
    </div>
  );
}

export default AutoComplete;
