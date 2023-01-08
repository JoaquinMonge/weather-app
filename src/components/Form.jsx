import axios from "axios";
import React, { useEffect, useState } from "react";
import { CountryCode } from "../CountryCode";
import { Search } from "../Search";

export const Form = () => {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const code = CountryCode();
  // const { error, data, searchLocation, change, location } = Search(code);

  const [data, setData] = useState({});
  const [location, setLocation] = useState("");
  const [country, setCountry] = useState("CR");
  const key = "77c719017385672c0b43fd8ca34c4f04";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},${country}&appid=${key}&units=metric`;

  const searchLocation = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (location.length === 0) {
      setIsLoading(false);
      setError(true);
      return;
    } else {
      axios
        .get(url)
        .catch(function (error) {
          setError(true);
          console.log(error.response);
        })
        .then((response) => {
          setData(response.data);
          console.log(response.data);
          setError(false);
        });

      setTimeout(() => {
        setError(false);
        setIsLoading(false);
      }, 3000);

      setLocation("");
    }
  };

  const inputHandler = (e) => {
    setLocation(e.target.value);
  };

  const inputError = error ? "errorInput" : "input";
  return (
    <>
      <form onSubmit={searchLocation}>
        <div className={inputError}>
          <input
            placeholder="Enter location"
            type="text"
            onChange={inputHandler}
            value={location}
          />
        </div>
        <div>
          <select onChange={(e) => setCountry(e.target.value)}>
            <option value="CR">CR</option>
            {code.map((ctry) => (
              <option value={ctry.fields.iso2_code} key={ctry.fields.iso2_code}>
                {ctry.fields.iso2_code}
              </option>
            ))}
          </select>

          {error ? <p className="error">Location not found</p> : ""}
        </div>

        <button>Search</button>
      </form>

      {isLoading ? (
        <div className="sk-folding-cube">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
        </div>
      ) : (
        <div className="container">
          {data.main ? (
            <img
              src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`}
              alt=""
            />
          ) : null}

          {data.name ? <h2>{data.name}</h2> : <h1>Search Weather</h1>}

          {data.main ? <p>{Math.trunc(data.main.temp)}°</p> : null}

          {data.weather ? <h3>{data.weather[0].main}</h3> : null}
          {data.main ? (
            <p>
              Max. : {Math.trunc(data.main.temp_max)}° Min.:{" "}
              {Math.trunc(data.main.temp_min)}°
            </p>
          ) : null}
        </div>
      )}
    </>
  );
};
