import React, { useState } from 'react';
import './Book1.css'; 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book8 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>Don Quixote</h1>
        <p><strong>Author:</strong> Miguel de Cervantes</p>
        <p><strong>Published:</strong> Part 1 in 1605, Part 2 in 1615</p>
        <p><strong>Genre:</strong> Novel, Satire</p>
        <p><strong>Pages:</strong> Varies by edition</p>
        <p><strong>Summary:</strong> 
          Don Quixote is a novel by Miguel de Cervantes that follows the adventures of Alonso Quixano, an elderly gentleman who becomes obsessed with books of chivalry and decides to become a knight-errant named Don Quixote.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://m.media-amazon.com/images/I/71GBg+Ah1cL._AC_UF1000,1000_QL80_.jpg" alt="Don Quixote" />
      </div>
    </div>
  );
}

export default Book8;

