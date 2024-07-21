import React, { useState } from 'react';
import './Book1.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book17 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>The Daughters Tale</h1>
        <p><strong>Author:</strong> Armando Lucas Correa</p>
        <p><strong>Published:</strong> May 7, 2019</p>
        <p><strong>Genre:</strong> Historical fiction, World War II</p>
        <p><strong>Pages:</strong> Approximately 320 pages (Atria Books)</p>
        <p><strong>Summary:</strong> 
          The Daughters Tale is a novel by Armando Lucas Correa that tells the story of a mother and daughter separated during World War II and their struggles to reunite amidst the turmoil of the Holocaust.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://d28hgpri8am2if.cloudfront.net/book_images/onix/cvr9781501187933/the-daughters-tale-9781501187933_xlg.jpg" alt="The Daughters Tale" />
      </div>
    </div>
  );
}

export default Book17;

