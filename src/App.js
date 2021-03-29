import { FormControl, MenuItem, Select, Card, CardContent } from "@material-ui/core";
import React, {useState, useEffect } from "react";
import InfoBox from './InfoBox';
import Table from "./Table";
import "./App.css";
import Map from "./Map";
//import img1 from "/Downloads/JohnsHopkins.jpg";
  
function App() {
  const [countries, setCountries] = useState(['india','usa']);
  const[country, setCountry] = useState("worldwide");
  const[countryInfo, setCountryInfo] =useState({});
  const[tableData, setTableData] = useState([]);
  
useEffect(()=>{
  fetch("https://disease.sh/v3/covid-19/all")
  .then(response => response.json())
  .then(data => {
         setCountryInfo(data);
  })
},[])

  //https://disease.sh/v3/covid-19/countries

    useEffect(() => {
          
      const getCountriesData = async () => {
        await fetch("https://disease.sh/v3/covid-19/countries")
         .then((response) => response.json())
         .then((data) => {
           const countries = data.map((country) => (
             {
               name: country.country,
               value: country.countryInfo.iso2
                }));
                 
                
                setTableData(data);
                setCountries(countries);
         });
      };
       getCountriesData();
    },[]);
       
    const onCountryChange = async (event) => {
      const countryCode = event.target.value;

     // console.log("showw >>", countryCode);
      setCountry(countryCode);

        const url = countryCode === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' :
         `https://disease.sh/v3/covid-19/countries/${countryCode}`

         await fetch(url)
         .then(response => response.json())
         .then(data => {
             setCountry(countryCode);
             setCountryInfo(data);
         });
      //https://disease.sh/v3/covid-19/all
      //https://disease.sh/v3/covid-19/countries/[COUNTRY_CODE]
    };
   console.log("country info >>", countryInfo);
  return(
    <div className="app">
      <div className="app__left">
      
       {/*header*/}
       <div className="app__header">
        <h1>COVID-19-TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" onChange={onCountryChange} value={country} >
           {/* Loop trough all the countries and show a dropdown list of the options */}
            {/*Title + select input dropdown field*/}
           <MenuItem value="worldwide">Worldwide</MenuItem>
              {
                countries.map((country) =>(
                  <MenuItem value={country.value}>{country.name}</MenuItem>
                ))
              }

          {/*<MenuItem value="worldwide">Worldwide</MenuItem>
          <MenuItem value="worldwide">2</MenuItem>
          <MenuItem value="worldwide">3</MenuItem>
         <MenuItem value="worldwide">4</MenuItem> */}
          </Select>
        </FormControl>
        </div>

      <div className="app__stats">
         <InfoBox title="Coronavirus cases" cases={countryInfo.todayCases} total={countryInfo.cases} />

         <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />

         <InfoBox title="Deaths"  cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
        {/*InfoBoxs*/}
        {/*InfoBoxs*/}
        {/*InfoBoxs*/}

      </div>
         {/*Map*/}
          <Map />
          
      <img src= "/images/JohnsHopkins.jpg" width="600" alt= " " /> 
      
      </div>
      <Card className="app__right">
        <CardContent>
           {/*table*/}
          <h3>Live cases by country</h3>
             <Table countries={tableData} />
          <h3>Worldwide new cases</h3>
        </CardContent>
      </Card>
    </div>
  );
}

export default App;
