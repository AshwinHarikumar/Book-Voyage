import React, { useState } from 'react';
import './Book1.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book7 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>Frankenstein</h1>
        <p><strong>Author:</strong> Mary Shelley</p>
        <p><strong>Published:</strong> January 1, 1818</p>
        <p><strong>Genre:</strong> Gothic fiction, Science fiction</p>
        <p><strong>Pages:</strong> Approximately 280 pages (Penguin Classics)</p>
        <p><strong>Summary:</strong> 
          Frankenstein; or, The Modern Prometheus is a novel by Mary Shelley that tells the story of Victor Frankenstein, a young scientist who creates a grotesque creature in an unorthodox scientific experiment.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://cdn.kobo.com/book-images/4f850ff0-497b-4199-8f4a-e3c6724e7364/1200/1200/False/frankenstein-786.jpg" alt="Frankenstein" />
      </div>
    </div>
  );
}

export default Book7;

