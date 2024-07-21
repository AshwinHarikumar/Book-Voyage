import React, { useState } from 'react';
import './Book1.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book2 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="book-container">
      <div className="book-info">
        <h1>1984</h1>
        <p><strong>Author:</strong> George Orwell</p>
        <p><strong>Published:</strong> June 8, 1949</p>
        <p><strong>Genre:</strong> Dystopian fiction</p>
        <p><strong>Pages:</strong> 328 pages (Mass Market Paperback)</p>
        <p><strong>Summary:</strong> 
          1984 is a dystopian novel by George Orwell published in 1949. The novel is set in Airstrip One (formerly known as Great Britain), a province of the superstate Oceania in a world of perpetual war, omnipresent government surveillance, and public manipulation. The novel's protagonist, Winston Smith, is a citizen of Oceania, one of the world's three intercontinental superstates, and works at the Ministry of Truth, which is responsible for propaganda and historical revisionism.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://m.media-amazon.com/images/I/612ADI+BVlL._AC_UF1000,1000_QL80_.jpg" alt="1984" />
      </div>
    </div>
  );
}

export default Book2;
