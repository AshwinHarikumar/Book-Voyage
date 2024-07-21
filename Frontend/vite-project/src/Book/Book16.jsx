import React, { useState } from 'react';
import './Book1.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book16 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>The Alchemist</h1>
        <p><strong>Author:</strong> Paulo Coelho</p>
        <p><strong>Published:</strong> 1988</p>
        <p><strong>Genre:</strong> Novel, Quest, Fantasy</p>
        <p><strong>Pages:</strong> Approximately 197 pages (HarperOne)</p>
        <p><strong>Summary:</strong> 
          The Alchemist is a novel by Paulo Coelho that follows the journey of Santiago, a shepherd boy, who dreams of finding treasure in Egypt and discovers spiritual truths about life and oneself along the way.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://m.media-amazon.com/images/I/71zHDXu1TaL._AC_UF1000,1000_QL80_.jpg" alt="The Alchemist" />
      </div>
    </div>
  );
}

export default Book16;

