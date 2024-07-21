import React, { useState } from 'react';
import './Book1.css'; 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book9 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>The Catcher in the Rye</h1>
        <p><strong>Author:</strong> J.D. Salinger</p>
        <p><strong>Published:</strong> July 16, 1951</p>
        <p><strong>Genre:</strong> Novel, Coming-of-age</p>
        <p><strong>Pages:</strong> Approximately 277 pages (Little, Brown and Company)</p>
        <p><strong>Summary:</strong> 
          The Catcher in the Rye is a novel by J.D. Salinger that tells the story of Holden Caulfield, a teenager who is expelled from prep school and wanders through New York City grappling with adolescence and his own sense of alienation.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="
https://m.media-amazon.com/images/I/8125BDk3l9L._AC_UF1000,1000_QL80_.jpg" alt="The Catcher in the Rye" />
      </div>
    </div>
  );
}

export default Book9;

