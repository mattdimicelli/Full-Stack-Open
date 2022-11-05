import {useState} from 'react';

const Entry = ({name, number}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
    </tr>
  );
}

const PhoneDirectory = ({ entries, newSearch }) => {
  const filtered = entries.filter(entry => entry.name.toLowerCase().includes(newSearch.toLowerCase()));
  const rows = filtered.map(entry => ( <Entry key={entry.name} name={entry.name} number={entry.number} /> ))
  return (
    <table>
      <tbody>
        { rows }
      </tbody>
    </table>
  );
};

const Search = ({ newSearchHandler, newSearchValue }) => (
  <label>Search: <input onChange={newSearchHandler} value={newSearchValue}></input></label>
);

const App = () => {
  const [ persons, setPersons ] = useState( [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ] );
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newSearch, setNewSearch ] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    if (persons.find(person => person.name === newName)) {
      alert(`${newName} is already added to the phone book.`);
      return;
    }
    setPersons(persons.concat({ name: newName, number: newNumber }));
    setNewName('');
    setNewNumber('');
  }

  const handleChangeName = e => { setNewName(e.currentTarget.value); };
  const handleChangeNumber = e => { setNewNumber(e.currentTarget.value); };
  const handleChangeSearch = e => { setNewSearch(e.currentTarget.value); };


  return (
    <div>
      <h2>Phonebook</h2>
      <Search newSearchHandler={handleChangeSearch} newSearchValue={newSearch} />
      <form onSubmit={handleSubmit}>
        <label>name: <input onChange={handleChangeName} value={newName} /> </label>
        <div><label>number: <input onChange={handleChangeNumber} value={newNumber} /> </label> </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <PhoneDirectory entries={persons} newSearch={newSearch} />
    </div>
  )
}

export default App


