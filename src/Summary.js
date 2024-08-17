import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './summary.css';

const Summary = () => {
  const [inputValue, setInputValue] = useState('');

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
        <Link 
          to={`/videosummarydetail/${inputValue}`} 
          className={`video-link ${!inputValue ? 'disabled' : ''}`}
          disabled={!inputValue}
        >
          summary
        </Link>
      </div>
    </div>
  );
};

export default Summary;