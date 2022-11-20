import { useState, useEffect } from 'react';
import directoryService from './services/directory.js';

const Entry = ({name, number, entryId, handleDelete}) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{number}</td>
      <td><button onClick={() => handleDelete(entryId)}>Delete</button></td>
    </tr>
  );
}

const PhoneDirectory = ({ entries, newSearch, handleDelete }) => {
  const filtered = entries.filter(entry => entry.name.toLowerCase().includes(newSearch.toLowerCase()));
  const rows = filtered.map(entry => ( <Entry key={entry.id} name={entry.name} number={entry.number} entryId={entry.id} handleDelete={handleDelete} /> ))
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
  const [ entries, setEntries ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newSearch, setNewSearch ] = useState('');

  useEffect(() => {
    directoryService.getAllEntries()
    .then(setEntries);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (entries.find(entry => entry.name === newName)) {
      alert(`${newName} is already added to the phone book.`);
      return;
    }
    directoryService.newEntry({ name: newName, number: newNumber })
    .then(entry => setEntries(entries.concat(entry)));
    setNewName('');
    setNewNumber('');
  }

  const handleChangeName = e => { setNewName(e.currentTarget.value); };
  const handleChangeNumber = e => { setNewNumber(e.currentTarget.value); };
  const handleChangeSearch = e => { setNewSearch(e.currentTarget.value); };
  const handleDelete = (id) => {
    if (window.confirm('Delete this entry?')) {
      directoryService.deleteEntry(id)
      .then(entry => { setEntries(entries.filter(entry => entry.id !== id))})
      .catch(err => console.error(err));
    }
  };


  return (
    <div>
      <h2>Phonebook</h2>
      <Search newSearchHandler={handleChangeSearch} newSearchValue={newSearch} />
      <form onSubmit={handleSubmit}>
        <label>Enter name: <input onChange={handleChangeName} value={newName} /> </label>
        <div><label>Enter number: <input onChange={handleChangeNumber} value={newNumber} /> </label> </div>
        <div>
          <button type="submit">Add</button>
        </div>
      </form>
      <h2>Results</h2>
      <PhoneDirectory entries={entries} newSearch={newSearch} handleDelete={handleDelete} />
    </div>
  )
}

export default App


