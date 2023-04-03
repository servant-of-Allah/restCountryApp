import React from "react";

const CountryCard = ({
  setGoToCountryDetail,
  name,
  flag,
  flagAlt,
  region,
  capital,
  population,
  country,
  setCountry,
}) => {
  function handleClick() {
    setGoToCountryDetail(true);
    setCountry(country);
  }

  return (
    <section className="country-card grid" onClick={handleClick}>
      <img src={flag} alt={flagAlt != '' ? flagAlt : 'country-flag'} className="country-flag" />
      <div className="country-info grid">
        <p className="p-title">{name}</p>
        <p className="p-semi-title">
          Population: <span className="span-info">{population}</span>
        </p>
        <p className="p-semi-title">
          Region: <span className="span-info">{region}</span>
        </p>
        <p className="p-semi-title">
          Capital: <span className="span-info">{capital}</span>
        </p>
      </div>
    </section>
  );
};

export default CountryCard;
