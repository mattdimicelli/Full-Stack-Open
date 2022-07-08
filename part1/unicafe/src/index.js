import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';



const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleClickGood = () => { setGood(good + 1) };

  const handleClickNeutral = () => { setNeutral(neutral + 1) };

  const handleClickBad = () => { setBad(bad + 1) };

  return (
    <div>
      <h1>give feedback</h1>

      <div>
        <button onClick={handleClickGood}>good</button>
        <button onClick={handleClickNeutral}>neutral</button>
        <button onClick={handleClickBad}>bad</button>
      </div>

      <table>
        <caption>statistics</caption>
        <tbody>
          <tr>
            <th>good</th>
            <td>{good}</td>
          </tr>
          <tr>
            <th>neutral</th>
            <td>{neutral}</td>
          </tr>
          <tr>
            <th>bad</th>
            <td>{bad}</td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

