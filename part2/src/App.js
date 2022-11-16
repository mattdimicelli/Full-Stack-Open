import { useState, useEffect } from 'react';
import axios from 'axios';

const Country = () => {};

const Information = countries => {
  console.log(countries);
  let display;
  if (countries.length > 10) {
    display = <p>Too many matches, specify another filter</p>;
  }
  else if (countries.length > 1 && countries.length <= 10) {
    // display = // to do;
  }
  else if (countries.length === 1) {
    display = <Country />
  }
  return (
    display
  );
}

const App = () => {

  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  const onChangeSearch = e => setSearch(e.currentTarget.value);

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then(res => setCountries(res.data));
  }, []);

  return (
    <>
      <label>Find countries: <input type="search" value={search} onChange={onChangeSearch} /></label>
      <Information countries={countries} /> 
    </>
    
  );
}

export default App


