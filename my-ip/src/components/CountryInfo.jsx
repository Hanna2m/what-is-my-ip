import { useEffect, useState } from "react";
import axios from "axios";
import { DateTime } from "luxon";

const CountryInfo = ({ userCountry }) => {
  const [countryInfo, setCountryInfo] = useState();
  const [date, setDate] = useState(DateTime.now().c)
  const [dateGermany, setDateGermany] = useState(DateTime.local().setZone("Europe/Berlin"))
  console.log(dateGermany)

  useEffect(() => {
    const fetchCountryInfo = async () => {
      await axios
        .get(`https://restcountries.com/v3.1/alpha/${userCountry}`)
        .then((response) => setCountryInfo(response.data[0]))
        .catch((error) => console.log(error));
    };
    fetchCountryInfo();
    setInterval(setDate(DateTime.now().c), 1000)
  }, [userCountry]);


  return (
    <div>
      {countryInfo ? (
        <div>
          <p>
            The country you are located in is{" "}
            {countryInfo.altSpellings[1]}.
          </p>
          <p>
            Current date:
            {date.day+"/"+date.month+"/"+date.year}
          </p>
          <p>
            Current time: 
            {date.hour+":"+date.minute+":"+date.second}
          </p>
          <p>
            Current Berlin time: 
            {dateGermany.hour+":"+dateGermany.minute+":"+dateGermany.second}
          </p>
          
          <p>
            {countryInfo.population
              .toString()
              .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}{" "}
            people live here.
          </p>
          <p>
            The capital of {countryInfo.altSpellings[1]} is{" "}
            {countryInfo.capital[0]}.
          </p>
          <p>
            People are driving on the {countryInfo.car.side} side of
            the street.
          </p>
          <p>
            In Sweden, {countryInfo.altSpellings[1]} is called{" "}
            {countryInfo.translations.swe.official}.
          </p>
          <p>The flag:</p>
          <img
            src={countryInfo.flags.png}
            alt={`flag of ${countryInfo.altSpellings[1]}`}
          />
        </div>
      ) : (
        "Loading..."
      )}
    </div>
  );
};

export default CountryInfo;