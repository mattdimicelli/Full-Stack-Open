import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

const Statistic = ({header, value}) => (
          <tr>
            <th>{header}</th>
            <td>{value}</td>
          </tr>
)

const Statistics = ({good, bad, neutral, all}) => {
  return all === 0 ? 'No feedback given' : (
      <table>
        <caption>statistics</caption>
        <tbody>
          <Statistic header='good' value={good} />
          <Statistic header='neutral' value={neutral} />
          <Statistic header='bad' value={bad} />
          <Statistic header='all' value={all} />
          <Statistic header='average' value={all > 0 ? (good - bad)/all : 'N/A'} />
          <Statistic header='positive' value={`${(all > 0 ? (good/all)*100 : 'N/A')}%`} />
        </tbody>
      </table>
  )
}

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

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
        <Button handleClick={handleClickGood} text='good' />
        <Button handleClick={handleClickNeutral} text='neutral' />
        <Button handleClick={handleClickBad} text='bad' />
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

