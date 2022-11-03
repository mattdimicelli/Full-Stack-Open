import {useState} from 'react';

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const handleSubmit = e => {
    e.preventDefault();
    setPersons(persons.concat({ name: newName }));
    setNewName('');
  }

  const handleChange = e => {
    setNewName(e.currentTarget.value);
  };

  const ulStyles = { listStyle: 'none' };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input onChange={handleChange} />
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


