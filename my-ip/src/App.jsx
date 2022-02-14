import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import { useState, useEffect } from 'react'
import  MyMap  from './components/MyMap';
import CountryInfo from './components/CountryInfo';
import Container from '@mui/material/Container';

function App() {
  const [userLocation, setUserLocation] = useState();
  const [userIP, setUserIP] = useState();
  const [countryData, setCountryData] = useState({});
  const [key, setKey] = useState()
  //const now = DateTime.now()


  const fetchIP = async () => {
    await axios
    .get (`https://geo.ipify.org/api/v2/country,city?apiKey=${process.env.REACT_APP_IPIFY_KEY}`)
    .then ((response) => {
      console.log(response.data)
      setUserIP(response.data.ip);
      setUserLocation(response.data.location);
    })
    
    .catch((error) => console.log("error", error));
  }
   

  //get country information
  const getCountryData = async () => {

      setKey(`${userLocation.country}`)
        console.log(key)
        axios.get(`https://restcountries.com/v3.1/alpha/${key}`)

        .then((response) => {
          console.log(response)
          const data = response.data[0];
          setCountryData({
            name: data.name.common,
              flag: data.flags.png,
              capital: data.capital[0],
              currency: data.currencies.EUR.name,
              currSymbol: data.currencies.EUR.symbol
          })
        })
        .catch((e) => console.log(e))
      } 
      

  useEffect(() => {
    fetchIP()
    console.log(userLocation)
    // setTimeout(() => {getCountryData()}, 5000)
    // console.log({countryData})

  }, [])
  
  
  return (
    <div className="App">
      {/* {userLocation ? (
        <><Container maxWidth="sm">
          <MyMap id="map" lng={userLocation.lng} lat={userLocation.lat} />
        </Container></>
          ) : (
            <p>Loading map...</p>
          )} */}


      {userLocation ? (
            <MyMap id="map" lng={userLocation.lng} lat={userLocation.lat} />
          ) : (
            <p>Loading map...</p>
          )}
     <p>
        Your IP is: {userIP}
        </p>
        {userLocation ? (
          <>
            <h3>Your location is: {userLocation.city}</h3>
            <h3>Your region is: {userLocation.region}</h3>
            <h3>Your country is: {userLocation.country}</h3>
            <h3>Your latitude is: {userLocation.lat}</h3>
            <h3>Your longitude is: {userLocation.lng}</h3>
            <CountryInfo  userCountry={userLocation.country}/>
          </>
        ) : (
          "Loading..."
        )}


  
    </div>
  );
}

export default App;
