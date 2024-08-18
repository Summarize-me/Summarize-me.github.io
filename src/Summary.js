import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './summary.css';

const Summary = () => {
  const [inputValue, setInputValue] = useState('');
  const [language, setLanguage] = useState('en'); // default to 'en'

  return (
    <div className="video-redirect-container">
      <h2>Summarise</h2>
      <div className="input-group">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter video ID"
          className="video-input"
        />

        <select 
          value={language} 
          onChange={(e) => setLanguage(e.target.value)} 
          className="language-select"
        >
          <option value="en">English</option>
          <option value="hi">Hindi</option>
        </select>

        <Link 
          to={`/videosummarydetail/${inputValue}?lang=${language}`} 
          className={`video-link ${!inputValue ? 'disabled' : ''}`}
          disabled={!inputValue}
        >
          Summary
        </Link>
      </div>
    </div>
  );
};

export default Summary;
