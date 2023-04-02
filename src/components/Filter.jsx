import React, { useState } from "react";
import { BiChevronDown } from "react-icons/bi";

const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

const Filter = ({ getCountriesByRegion }) => {
  const [expanded, setExpanded] = useState(false);

  function toggleExpand() {
    expanded ? setExpanded(false) : setExpanded(true);
  }

  return (
    <div className="app-filter flex">
      <div className="app-filter-heading flex">
        <p>Filter by Region</p>
        <BiChevronDown className="icon icon-arrowdown" onClick={toggleExpand} />
      </div>
      <FilterButtons
        isExpanded={expanded}
        getCountriesByRegion={getCountriesByRegion}
      />
    </div>
  );
};

const FilterButtons = ({ isExpanded, getCountriesByRegion }) => {
  return (
    <div
      aria-expanded={isExpanded ? "true" : "false"}
      className="filter-buttons flex"
    >
      {regions.map((region) => (
        <button
          key={region}
          value={region}
          onClick={() => getCountriesByRegion(region, "region")}
          aria-expanded={isExpanded ? "true" : "false"}
        >
          {region}
        </button>
      ))}
    </div>
  );
};

export default Filter;
