import './App.css';
import { FormControl, Select, MenuItem, Card, CardContent } from '@mui/material'
import { useState, useEffect } from 'react';
import { InfoBox } from './InfoBox';
import {InfoBox2} from './InfoBox2';
import { Table  } from './Table';
import {LineChart} from './LineChart';
import { sortData } from './util'
import "leaflet/dist/leaflet.css";


function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState("Worldwide");
  const [countryInfo , setCountryInfo] = useState({});
  const [tableData , setTableData] = useState([]);

  useEffect(()=>{
    fetch("https://disease.sh/v3/covid-19/all")
    .then((country) => country.json())
    .then(data => {
      setCountryInfo(data);
    })
  } ,[])


  useEffect(() => {
    const getCountriesData = () => {
      fetch('https://disease.sh/v3/covid-19/countries')
        .then((country) => country.json())
        .then((data) => {
          const countries1 = data.map((country) => ({
            name: country.country,
            value: country.countryInfo.iso2
          }));
          // console.log(countries1);
          setCountries(countries1);
          const sortedData = sortData(data);
          setTableData(sortedData);
        });
    }

    getCountriesData();
  }, [])


  const onclickDropdown = async (event) => {
    const countryCode = event.target.value;
    
    const url = countryCode === "Worldwide" ? "https://disease.sh/v3/covid-19/all" : `https://disease.sh/v3/covid-19/countries/${countryCode}`;
    
    await fetch(url)
    .then(country => country.json())
    .then((data) => {
      
      setCountry(countryCode);
      setCountryInfo(data);
    })

  }
  return (
    <div className="App">
      <div className="app__left">
        <div className="app__header">
          <h1>Covid-19 Tracker {country}</h1>
          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onclickDropdown} value={country}>
              <MenuItem value="Worldwide">Worldwide</MenuItem>
              {
                countries.map((country) => {
                  return <MenuItem value={country.value}>{country.name}</MenuItem>
                })
              }
            </Select>
          </FormControl>
        </div>
          <h3 className="text">{countryInfo.country}</h3>
        <div className="app__infobox box1">
          <InfoBox className="infobox" title="Covid-19 Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
          <InfoBox className="infobox" title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
          <InfoBox className="infobox" title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        </div>
        <div className="app__infobox box2">
          <InfoBox2 className="infobox" title="Total Tests" cases={countryInfo.tests} total={countryInfo.testsPerOneMillion} />
          <InfoBox2 className="infobox" title="Critical Cases" cases={countryInfo.critical} total={countryInfo.criticalPerOneMillion} />
          <InfoBox2 className="infobox" title="Total Population" cases={countryInfo.population}  />
        </div>

      </div>

      <Card className="app__right">
        <CardContent>
          <h3>Covid Cases by Country</h3>
          <Table countries={tableData}/>
          <h3>World wide new Cases</h3>
              <LineChart casesType ="cases"/>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
