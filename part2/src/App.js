import { useState, useEffect } from 'react';
import axios from 'axios';

const Country = ({country}) => {
  console.log(country)
  return (
    <>
      <h1>{country.name.common}</h1>
      <table>
        <tbody>
          <tr>
            <th>Capital: </th>
            {country.capital.map(capital => <td key={capital}>{capital}</td>)}
          </tr>
          <tr>
            <th>Population: </th>
            <td>{country.population}</td>
          </tr>
        </tbody>
      </table>
      <figure>
        <figcaption>Languages</figcaption>
        <ul>
          {Object.entries(country.languages).map(([k,v]) => {
          return(
          <li key={k}>{v}</li>
          ) 
        })}
        </ul>
      </figure>
    </>
  )
};

const Information = ({searchResults}) => {
  let display;
  if (searchResults.length > 10) {
    display = <p>Too many matches, specify another filter</p>;
  }
  else if (searchResults.length > 1 && searchResults.length <= 10) {
    display = searchResults.map(country => <p key={country.name.common}>{country.name.common}</p>) 
  }
  else if (searchResults.length === 1) {
    display = <Country country={searchResults[0]} />
  }
  return (
    display
  );
}

const App = () => {

  const [searchQuery, setSearchQuery] = useState('');
  const [countriesData, setCountriesData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  const onChangeSearch = e => {
    setSearchQuery(e.currentTarget.value);
    let matches = countriesData.filter(country =>  {
      return country.name.common.toLowerCase().includes(e.currentTarget.value.toLowerCase()) || country.name.official.toLowerCase().includes(e.currentTarget.value.toLowerCase());
    });
    setSearchResults(matches);
  };

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(res => setCountriesData(res.data));
  }, []);

  return (
    <>
      <label>Find countries: <input type="search" value={searchQuery} onChange={onChangeSearch} /></label>
      <Information searchResults={searchResults} /> 
    </>
    
  );
}

export default App


