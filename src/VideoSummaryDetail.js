import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import './videocontent.css';
import DOMPurify from 'dompurify';
import { getSubtitles } from 'youtube-captions-scraper';

const VideoSummaryDetail = () => {
    const [content, setContent] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [aiResponse, setAiResponse] = useState('check settings!');
    const { videoId } = useParams();
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const language = params.get('lang') || 'en'; // Default to 'en' if not provided

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            try {
                getSubtitles({
                    videoID: videoId,
                    lang: language, // Use selected language
                }).then(captions => {
                    console.log(captions);
                    let sub = ''
                    for (let c in captions) {
                        sub += ' ' + captions[c].text
                    }
                    callAiApi(sub);
                });
                setError(null);
            } catch (error) {
                console.error('Error:', error);
                setError('Error loading content. Please try again later.');
                setContent([]);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContent();
    }, [videoId, language]); // Include language in dependency array

    const callAiApi = async (transcriptText) => {
        const apiKey = localStorage.getItem('apiKey');
        const aiPrompt = localStorage.getItem('aiPrompt');

        if (!apiKey || !aiPrompt) {
            setError('API key or AI prompt not set. Please update your settings.');
            return;
        }

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [
                            {
                                parts: [
                                    {
                                        text: `${aiPrompt}\n\nTranscript: ${transcriptText}`,
                                    },
                                ],
                            },
                        ],
                    }),
                }
            );

            if (!response.ok) {
                throw new Error('Failed to get AI response');
            }

            const data = await response.json();
            setAiResponse(data.candidates[0].content.parts[0].text);
        } catch (error) {
            console.error('Error calling AI API:', error);
            setError('Error processing with AI. Please try again later.');
        }
    };

    return (
        <div className="video-content-page">
            <Link to="/" className="back-button">
                ← Back to Videos
            </Link>
            <h1 className="page-title">Video Transcript</h1>
            {isLoading ? (
                <div className="loading">Loading transcript...</div>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : (
                <>
                    {aiResponse && (
                        <div
                            className="ai-response"
                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(aiResponse) }}
                        />
                    )}
                </>
            )}
            <Link to="/settings" className="settings-link">Settings</Link>
        </div>
    );
};

export default VideoSummaryDetail;
