import React, { useState } from 'react';
import './Book1.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book12 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>The Handmaid's Tale</h1>
        <p><strong>Author:</strong> Margaret Atwood</p>
        <p><strong>Published:</strong> 1985</p>
        <p><strong>Genre:</strong> Dystopian, Feminist literature</p>
        <p><strong>Pages:</strong> Approximately 311 pages (Vintage Books)</p>
        <p><strong>Summary:</strong> 
          The Handmaid's Tale is a dystopian novel by Margaret Atwood set in a future totalitarian society where women are subjugated and used for reproduction. It follows the story of Offred, a Handmaid who navigates life under the oppressive regime of the Republic of Gilead.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://m.media-amazon.com/images/I/61su39k8NUL._AC_UF1000,1000_QL80_.jpg" alt="The Handmaid's Tale" />
      </div>
    </div>
  );
}

export default Book12;

