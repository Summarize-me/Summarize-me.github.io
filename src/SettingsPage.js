import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SettingsPage.css';

const SettingsPage = () => {
  const [apiKey, setApiKey] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');

  useEffect(() => {
    // Load settings from localStorage when component mounts
    const savedApiKey = localStorage.getItem('apiKey') || '';
    const savedAiPrompt = localStorage.getItem('aiPrompt') || '';
    setApiKey(savedApiKey);
    setAiPrompt(savedAiPrompt);
  }, []);

  const handleSave = () => {
    // Save settings to localStorage
    localStorage.setItem('apiKey', apiKey);
    localStorage.setItem('aiPrompt', aiPrompt);
    alert('Settings saved successfully!');
  };

  return (
    <div className="settings-page">
      <h1>Settings</h1>
      <div className="setting-field">
        <label htmlFor="apiKey">API Key:</label>
        <input
          type="text"
          id="apiKey"
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Enter your API key"
        />
      </div>
      <div className="setting-field">
        <label htmlFor="aiPrompt">AI Prompt:</label>
        <textarea
          id="aiPrompt"
          value={aiPrompt}
          onChange={(e) => setAiPrompt(e.target.value)}
          placeholder="Enter your AI prompt"
          rows="5"
        />
      </div>
      <button onClick={handleSave} className="save-button">Save Settings</button>
      <Link to="/" className="back-link">Back to Videos</Link>
    </div>
  );
};

export default SettingsPage;