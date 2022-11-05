import {useState} from 'react';

const App = () => {
  const [ persons, setPersons ] = useState( [
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ] );
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
      <table>
        { persons.map(person => (
          <tr key={person.name}>
            <td>{person.name}</td>
            <td>{person.number}</td>
          </tr>)) }
      </table>
    </div>
  )
}

export default App


