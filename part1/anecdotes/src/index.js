import React, {useState} from 'react';
import ReactDOM from 'react-dom/client';
import random from 'lodash.random';



const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0])
  const buttonStyles = { display: 'block' }
  const handleClickNext = () => setSelected(random(5))
  const handleClickVote = () => {
    const updated = [...votes];
    updated[selected]++;
    setVotes(updated);
  }; 
  const mostVotedAnecdote = anecdotes[votes.indexOf(Math.max(...votes))];

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>
        {anecdotes[selected]}
      </p>
      <p>Has {votes[selected]} votes.</p>
      <button style={buttonStyles} onClick={handleClickNext}>Next Anecdote</button>
      <button onClick={handleClickVote}>Vote</button>
      <h1>Anectode with most votes</h1>
      <p>{mostVotedAnecdote}</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App anecdotes={anecdotes} />
  </React.StrictMode>
);

