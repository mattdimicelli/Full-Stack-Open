import {useState} from 'react';

const App = () => {
  const [ persons, setPersons ] = useState( [{ name: 'Arto Hellas', number: '999-999-9999' }] );
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');

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

  const ulStyles = { listStyle: 'none' };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <label>
          name: <input onChange={handleChangeName} value={newName} />
        </label>
        <div>
          <label>
            number: <input onChange={handleChangeNumber} value={newNumber} />
          </label>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul style={ulStyles}>
        { persons.map(person => <li key={person.name}>{person.name}</li>) }
      </ul>
    </div>
  )
}

export default App


