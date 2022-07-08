import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';


const Statistics = ({good, bad, neutral, all}) => {
  return (
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
          <tr>
            <th>all</th>
            <td>{all}</td>
          </tr>
          <tr>
            <th>average</th>
            <td>{all > 0 ? (good - bad)/all : 'N/A'}</td>
          </tr>
          <tr>
            <th>positive</th>
            <td>{all > 0 ? (good/all)*100 : 'N/A'}%</td>
          </tr>
        </tbody>
      </table>
  )
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const all = good + bad + neutral

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
      <Statistics bad={bad} good={good} neutral={neutral} all={all} />

    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

