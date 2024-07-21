import React, { useState } from 'react';
import './Book1.css'; 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book6 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>The Great Gatsby</h1>
        <p><strong>Author:</strong> F. Scott Fitzgerald</p>
        <p><strong>Published:</strong> April 10, 1925</p>
        <p><strong>Genre:</strong> Novel, Jazz Age, Tragedy</p>
        <p><strong>Pages:</strong> Approximately 180 pages (Scribner)</p>
        <p><strong>Summary:</strong> 
          The Great Gatsby is a novel by F. Scott Fitzgerald that captures the decadence and excess of the Jazz Age. It tells the story of Jay Gatsby, a wealthy and mysterious millionaire, and his obsession with the beautiful Daisy Buchanan.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://m.media-amazon.com/images/I/81QuEGw8VPL._AC_UF1000,1000_QL80_.jpg" alt="The Great Gatsby" />
      </div>
    </div>
  );
}

export default Book6;

