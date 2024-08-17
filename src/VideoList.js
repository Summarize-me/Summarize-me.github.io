import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import videoData from './channel_videos.json';
import './videolist.css'

// Helper functions
const formatDuration = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
};

const truncateDescription = (description, maxLength) => {
  if (description.length <= maxLength) return description;
  return `${description.slice(0, maxLength)}...`;
};

const formatViews = (views) => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
};

const VideoList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const videosPerPage = 10;

  const handlePageClick = (data) => {
    setCurrentPage(data.selected);
  };

  const currentVideos = videoData.entries.slice(
    currentPage * videosPerPage,
    (currentPage + 1) * videosPerPage
  );

  return (
    <div className="video-list-container">
      <h1 className="page-title">YouTube Videos</h1>
      <div>
        <Link className="page-title" to={`/Summary`}>summary</Link>
      </div>

      <div className="video-grid">
        {currentVideos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
      <PaginationComponent
        pageCount={Math.ceil(videoData.entries.length / videosPerPage)}
        onPageChange={handlePageClick}
      />
    </div>
  );
};

const VideoCard = ({ video }) => (
  <>
    <Link to={`/video/${video.id}`} className="video-card">
      <div className="thumbnail-container">
        <img src={video.thumbnails[0].url} alt={video.title} className="thumbnail" />
        <div className="duration">{formatDuration(video.duration)}</div>
      </div>
      <div className="video-info">
        <h2 className="video-title">{video.title}</h2>
        <p className="video-description">{truncateDescription(video.description, 100)}</p>
        <div className="video-stats">
          <span className="views">{formatViews(video.view_count)} views</span>
        </div>
      </div>
    </Link>
  </>
);

const PaginationComponent = ({ pageCount, onPageChange }) => (
  <ReactPaginate
    previousLabel={'Previous'}
    nextLabel={'Next'}
    breakLabel={'...'}
    breakClassName={'break-me'}
    pageCount={pageCount}
    marginPagesDisplayed={2}
    pageRangeDisplayed={5}
    onPageChange={onPageChange}
    containerClassName={'pagination'}
    activeClassName={'active'}
  />
);

export default VideoList;