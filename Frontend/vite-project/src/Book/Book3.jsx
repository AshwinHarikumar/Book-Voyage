import React, { useState } from 'react';
import './Book1.css'; 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book3 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>Pride and Prejudice</h1>
        <p><strong>Author:</strong> Jane Austen</p>
        <p><strong>Published:</strong> January 28, 1813</p>
        <p><strong>Genre:</strong> Novel, Romance</p>
        <p><strong>Pages:</strong> Approximately 279 pages (Wordsworth Edition)</p>
        <p><strong>Summary:</strong> 
          Pride and Prejudice is a romantic novel by Jane Austen, first published in 1813. The story charts the emotional development of protagonist Elizabeth Bennet, who learns the error of making hasty judgments and comes to appreciate the difference between the superficial and the essential.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://cdn.kobo.com/book-images/1a735d96-6075-4bca-87b7-15fb97ee50c7/1200/1200/False/pride-and-prejudice-216.jpg" alt="Pride and Prejudice" />
      </div>
    </div>
  );
}

export default Book3;

