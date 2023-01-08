import axios from "axios";
import React, { useEffect, useState } from "react";

export const CountryCode = () => {
  const [code, setCode] = useState([]);

  const url1 = `https://public.opendatasoft.com/api/records/1.0/search/?dataset=countries-codes&rows=247`;

  useEffect(() => {
    async function fetchData() {
      await axios.get(url1).then((response) => {
        setCode(response.data.records);
        console.log(response.data.records);
      });
    }
    fetchData();
  }, [url1]);

  return code;
};
