import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const url = 'https://api.openai.com/v1/completions';
    const data = {
      prompt: `The inputs are a list of attributes, with those inputs, produce an estimate of the annual salary of the individual as well as the job title they hold: ${message}\n\nAnswer:`,
      model: 'text-davinci-003',
      max_tokens: 3000,
      n: 1,
      temperature: 1.0,
    };
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer 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`,
    };
    const res = await axios.post(url, data, { headers });
    setResponse(res.data.choices[0].text.trim());
  };

  return (
    <div className="app">
      <h1>Welcome to Salary Predictor</h1>
      <p>Salary Predictor is an AI-powered tool designed to demonstrate the power of AI, tools and better map the future monetary prospects of college students.</p>
      <p>Enter your attributes below to get started! (Ex: "Computer Science Major, Asian, 6 Feet, CMU")</p>
      <p>Results may not be satisfactory however simply resubmit if prediction is not offered.</p>

      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter attributes, separated by commas"
          className="input"
        />
        <button type="submit" className="button">Send</button>
      </form>

      {response && <div className="response"><p>{response}</p></div>}
      
      <div>
        <p>What percentage of the population will you land in? </p>
        <img src="https://www.statista.com/graphic/1/203183/percentage-distribution-of-household-income-in-the-us.jpg" alt="Statistic: Percentage distribution of household income in the United States in 2021 | Statista" style={{ width: "100%", height: "auto", maxWidth: "px", msInterpolationMode: "bicubic" }} />
      </div>
      
      <p>As time goes on, it's only natural our population becomes more and more educated; The percentage of our population with a college degree has steadily increased but that also means these degrees are less scarce, and maybe even less valuable.</p>
      <img src="https://www.mastersdegree.net/wp-content/uploads/2018/03/The-Percentage-of-Americans-With-College-Degrees-1.png" alt="College Degrees" className="image" />
    </div>
  );
}

export default App;
