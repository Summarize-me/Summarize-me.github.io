import React, { useState, useEffect } from 'react';

const VideoContent = ({ videoId, onClose }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(`/videoText/${videoId}vtt`);
        const text = await response.text();
        setContent(text);
      } catch (error) {
        console.error('Error fetching video content:', error);
        setContent('Error loading content');
      }
    };

    fetchContent();
  }, [videoId]);

  return (
    <div className="video-content">
      <button onClick={onClose}>Close</button>
      <pre>{content}</pre>
    </div>
  );
};

export default VideoContent;