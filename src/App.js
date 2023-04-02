import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Form from "./components/Form";
import Filter from "./components/Filter";
import CountryCard from "./components/CountryCard";
import CountryDetail from "./components/CountryDetail/CountryDetail";

const API_URL = "https://restcountries.com/v3.1";

function App() {
  const [countries, setCountries] = useState([]);
  const [goToCountryDetail, setGoToCounrtyDetail] = useState(false);
  const [country, setCountry] = useState({});

  const getCountries = async (param, type) => {
    let fetchCountryData, response;
    if (param === "all") {
      fetchCountryData = await fetch(`${API_URL}/${param}`);
    } else {
      try {
        fetchCountryData = await fetch(`${API_URL}/${type}/${param}`);
      } catch (e) {
        console.error(e);
      }
    }

    response = await fetchCountryData?.json();

    setCountries(response);
  };

  useEffect(() => {
    getCountries("all", "");
  }, []);

  function getCountryByName(name) {
    getCountries(name, "name");
  }

  function getCountriesByRegion(region) {
    getCountries(region, "region");
  }

  const countryList =
    countries?.length > 0 ? (
      countries.map((country) => (
        <CountryCard
          key={country.name.common}
          name={country.name.common}
          flag={country.flags.png}
          flagAlt={country.flags.alt}
          region={country.region}
          population={country.population}
          capital={country.capital}
          country={country}
          setCountry={setCountry}
          setGoToCountryDetail={setGoToCounrtyDetail}
        />
      ))
    ) : (
      <p className="error-massage">no countries found!</p>
    );

  return (
    <div className="App">
      <Header />

      {goToCountryDetail ? (
        <CountryDetail
          country={{ country }}
          setCountry={setCountry}
          setGoToCountryDetail={setGoToCounrtyDetail}
        />
      ) : (
        <main>
          <div className="section-filter section-padding flex">
            <Form getCountryByName={getCountryByName} />
            <Filter getCountriesByRegion={getCountriesByRegion} />
          </div>

          <div className="country-card-container flex section-padding">
            {countryList}
          </div>
        </main>
      )}
    </div>
  );
}

export default App;
