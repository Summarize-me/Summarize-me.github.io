import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import VideoList from './VideoList';
import VideoContentPage from './VideoContentPage';
import SettingsPage from './SettingsPage';
import VideoSummaryDetail from './VideoSummaryDetail';
import Summary from './Summary';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<VideoList />} />
          <Route path="/Summary" element={<Summary />} />

          <Route path="/video/:videoId" element={<VideoContentPage />} />
          <Route path="/videosummarydetail/:videoId" element={<VideoSummaryDetail />} />

          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;