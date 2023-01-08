import axios from "axios";
import React, { useState } from "react";

export const Search = (code) => {
  const [error, setError] = useState(false);
  console.log(code);

  const [data, setData] = useState({});
  const [location, setLocation] = useState("Alajuela");
  const [country, setCountry] = useState("CR");
  const key = "77c719017385672c0b43fd8ca34c4f04";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location},${code}&appid=${key}&units=metric`;

  const change = (e) => {
    setLocation(e.target.value);
  };

  const searchLocation = (e) => {
    e.preventDefault();

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
    }, 3000);

    setLocation("");
  };

  return {
    error,
    data,
    searchLocation,
    change,
    location,
  };
};
