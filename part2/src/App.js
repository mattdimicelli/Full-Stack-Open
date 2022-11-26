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

const Notification = ({ message }) => {
  const success  = { 
    color: 'green', 
    background: 'lightgrey', 
    fontSize: 20, 
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  return message === undefined ? null : <div style={success}>{message}</div>;
} 

const App = () => {
  const [ entries, setEntries ] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ newSearch, setNewSearch ] = useState('');
  const [ message, setMessage ] = useState(undefined);

  useEffect(() => {
    directoryService.getAllEntries()
    .then(setEntries);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    const duplicateEntry = entries.find(entry => entry.name === newName);
    if (duplicateEntry) {
      if (window.confirm(`${newName} is already in the phonebook. Replace the old number with a new
      one?`)) {
        directoryService.updateEntry({ ...duplicateEntry, number: newNumber })
        .then(updatedEntry => setEntries(entries.map(entry => entry.id !== updatedEntry.id ? entry:  updatedEntry)));
        setMessage(`${newName}'s phone number updated`);
        setTimeout(() => setMessage(undefined), 5000);
        setNewName('');
        setNewNumber('');
        return;
      }
      return;
    }
    directoryService.newEntry({ name: newName, number: newNumber })
    .then(entry => setEntries(entries.concat(entry)));
    setMessage(`${newName} successfully added`);
    setTimeout(() => setMessage(undefined), 5000);
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
      <Notification message={message} />
      <Search newSearchHandler={handleChangeSearch} newSearchValue={newSearch} />
      <h3>Add Entry</h3>
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


