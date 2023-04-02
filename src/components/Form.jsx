import React, { useState } from "react";
import { BsSearch } from "react-icons/bs";

const Form = ({ getCountryByName }) => {
  const [countryName, setCountryName] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (countryName == "") {
      return;
    }
    getCountryByName(countryName, "name");
    setCountryName("");
  }

  return (
    <form className="app-form" onSubmit={handleSubmit}>
      <BsSearch className="icon icon-search" onClick={handleSubmit} />
      <input
        placeholder="Search for a Country..."
        value={countryName}
        className="form-input"
        onChange={(e) => {
          setCountryName(e.target.value);
        }}
      ></input>
    </form>
  );
};

export default Form;
