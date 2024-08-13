import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './videocontent.css';
import DOMPurify from 'dompurify';

const getTextFromVTT = (vttContent) => {
    const lines = vttContent.trim().split('\n');
    let paragraphs = [];
    let currentParagraph = '';
    let isContent = false;

    for (let line of lines) {
        if (line.includes('-->')) {
            isContent = true;
            if (currentParagraph) {
                paragraphs.push(currentParagraph.trim());
                currentParagraph = '';
            }
            continue;
        }
        if (isContent) {
            // Remove timestamp tags
            line = line.replace(/<\d{2}:\d{2}:\d{2}\.\d{3}>/g, '');
            // Remove styling tags
            line = line.replace(/<[^>]+>/g, '');
            currentParagraph += line + ' ';
        }
    }
    if (currentParagraph) {
        paragraphs.push(currentParagraph.trim());
    }

    return paragraphs;
};

const VideoContentPage = () => {
    const [content, setContent] = useState([]);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [aiResponse, setAiResponse] = useState('check settings!');
    const { videoId } = useParams();

    useEffect(() => {
        const fetchContent = async () => {
            setIsLoading(true);
            try {
                const response = await fetch(`/videoText/${videoId}vtt`);
                if (!response.ok) {
                    throw new Error('Failed to fetch video content');
                }
                const text = await response.text();
                const parsedContent = getTextFromVTT(text);
                setContent(parsedContent);

                // Call AI API
                await callAiApi(parsedContent.join(' '));

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
    }, [videoId]);

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

export default VideoContentPage;