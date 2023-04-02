import React, { useEffect, useMemo, useState, useCallback } from "react";
import { BsArrowLeft } from "react-icons/bs";

import "./CountryDetail.css";

const API_URL = "https://restcountries.com/v3.1";

const CountryDetail = ({
  country: { country },
  setCountry,
  setGoToCountryDetail,
}) => {
  const [borderCountries, setBorderCountries] = useState([]);

  const languageAbbr = Object.keys(country.languages)[0];

  const languages = useMemo(() => {
    return Object.values(country.languages).join(", ");
  }, [country.languages]);

  const currencies = useMemo(() => {
    const currencies = [];
    for (let key in country.currencies) {
      currencies.push(country.currencies[key].name);
    }
    return currencies.join(", ");
  }, [country.currencies]);

  useEffect(() => {
    getBorderCountriesByCode(country);
  }, [country]);

  const getBorderCountriesByCode = useCallback(async (country) => {
    if (country.borders) {
      let abbr = country.borders;
      let codes = abbr.join(",");
      const fetchBorderCountry = await fetch(`${API_URL}/alpha?codes=${codes}`);
      const data = await fetchBorderCountry.json();

      setBorderCountries(data);
    }
  }, []);

  return (
    <article className="app-detail grid">
      <div
        className="btn-container flex"
        onClick={() => setGoToCountryDetail(false)}
      >
        <BsArrowLeft className="icon icon-arrowLeft" />
        <button type="button" className="back-btn">
          Back
        </button>
      </div>
      <div className="country-detail flex section-padding">
        <img
          className="img-detail-page"
          src={country.flags.png}
          alt={country.flagAlt}
        />

        <div className="detail-info grid">
          <h2 className="conuntry-name">{country.name.common}</h2>

          <section className="general-info-section flex">
            <div className="grid">
              <p className="p-semi-title">
                Native Name:{" "}
                <span className="span-info">
                  {country.name.nativeName[languageAbbr]?.common || "N/A"}
                </span>
              </p>
              <p className="p-semi-title">
                Population:{" "}
                <span className="span-info">{country.population}</span>
              </p>
              <p className="p-semi-title">
                Region: <span className="span-info">{country.region}</span>
              </p>
              <p className="p-semi-title">
                Sub Region:{" "}
                <span className="span-info">{country.subregion}</span>
              </p>
              <p className="p-semi-title">
                Capital: <span className="span-info">{country.capital}</span>
              </p>
            </div>
            <div className="grid">
              <p className="p-semi-title">
                Top Level Domain:{" "}
                <span className="span-info tld">{country.tld[0]}</span>
              </p>
              <p className="p-semi-title">
                Currencies:{" "}
                <span className="span-info">{currencies || "N/A"}</span>
              </p>
              <p className="p-semi-title">
                Languages:{" "}
                <span className="span-info">{languages || "N/A"}</span>
              </p>
            </div>
          </section>
          <div className="border-country-section flex">
            <p className="p-semi-title">Border Countries: </p>
            <div className="flex">
              {borderCountries.length > 0 ? (
                borderCountries.map((borderCountry) =>
                  typeof borderCountry === "object" &&
                  borderCountry.hasOwnProperty("name") ? (
                    <button
                      key={borderCountry.name.common}
                      className="border-country"
                      onClick={() => setCountry(borderCountry)}
                    >
                      {borderCountry.name.common}
                    </button>
                  ) : (
                    <p className="not-found" key="not-found">
                      N/A
                    </p>
                  )
                )
              ) : (
                <p className="not-found">N/A</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default CountryDetail;
