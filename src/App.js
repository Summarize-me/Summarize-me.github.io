// video summarize page
import React, { useState } from 'react';
import { TextField, Button, Container, CircularProgress, Typography } from '@mui/material';

function App() {
  const [url, setUrl] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleInputChange = (event) => {
    setUrl(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      validateUrl();
    }
  };

  const validateUrl = () => {
    // Regular expression to match a YouTube URL
    const youtubeUrlPattern = /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})$/;

    if (youtubeUrlPattern.test(url)) {
      fetchVideoSummary(url);
    } else {
      setSummary('Invalid YouTube URL');
    }
  };

  const fetchVideoSummary = async (url) => {
    setLoading(true);
    try {
      const response = await fetch('https://o3l74f3wfkhswddflomtgwidsm0bdpdv.lambda-url.ap-south-1.on.aws/', {
        method: 'POST',
        headers: {},
        body: JSON.stringify({ url })
      });
      debugger;
      const data = await response.text();
      if (response.ok) {
        setSummary(data);
      } else {
        setSummary('Error fetching video summary');
      }
    } catch (error) {
      console.error('Error fetching video summary:', error);
      setSummary('Error fetching video summary');
    }
    setLoading(false);
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <Typography variant="h3" sx={{ mb: 2 }}>
        Summarize me!
      </Typography>
      <TextField
        sx={{ width: '80%', mb: 2 }}
        variant="outlined"
        label="Enter Video URL"
        value={url}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <Button variant="contained" color="primary" onClick={validateUrl} disabled={loading}>
        {loading ? <CircularProgress size={24} color="inherit" /> : 'Submit'}
      </Button>
      {summary && (
        <Typography variant="body1" sx={{ mt: 2 }}>
          {summary}
        </Typography>
      )}
    </Container>
  );
}

export default App;
