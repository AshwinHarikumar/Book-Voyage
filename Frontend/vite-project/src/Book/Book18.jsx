import React, { useState } from 'react';
import './Book1.css'; 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book18 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>Himself</h1>
        <p><strong>Author:</strong> Jess Kidd</p>
        <p><strong>Published:</strong> March 1, 2016</p>
        <p><strong>Genre:</strong> Mystery, Fiction</p>
        <p><strong>Pages:</strong> Approximately 368 pages (Canongate Books)</p>
        <p><strong>Summary:</strong> 
          Himself is a novel by Jess Kidd that blends mystery and fantasy, set in a small Irish village where secrets unravel as a detective investigates a young man's return and his connection to a series of mysterious deaths.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://offtheshelf.b-cdn.net/app/uploads/2017/10/Himself.jpg" alt="Himself" />
      </div>
    </div>
  );
}

export default Book18;
