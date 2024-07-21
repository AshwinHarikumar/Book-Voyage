import React, { useState } from 'react';
import './Book1.css'; 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book11 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>Metamorphosis</h1>
        <p><strong>Author:</strong> Franz Kafka</p>
        <p><strong>Published:</strong> 1915</p>
        <p><strong>Genre:</strong> Novella, Absurdist fiction</p>
        <p><strong>Pages:</strong> Approximately 55 pages (Penguin Modern Classics)</p>
        <p><strong>Summary:</strong> 
          Metamorphosis is a novella by Franz Kafka that tells the story of Gregor Samsa, who wakes up one morning to find himself transformed into a giant insect-like creature. The story explores themes of alienation, identity, and existentialism.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://m.media-amazon.com/images/I/41GWXwbGuGL.jpg" alt="Metamorphosis" />
      </div>
    </div>
  );
}

export default Book11;

