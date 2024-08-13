import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoList from './VideoList';
import VideoContentPage from './VideoContentPage';
import SettingsPage from './SettingsPage';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/video/:videoId" element={<VideoContentPage />} />

          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;