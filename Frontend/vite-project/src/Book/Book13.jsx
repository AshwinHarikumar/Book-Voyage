import React, { useState } from 'react';
import './Book1.css'; 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book13 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>Beloved</h1>
        <p><strong>Author:</strong> Toni Morrison</p>
        <p><strong>Published:</strong> September 1987</p>
        <p><strong>Genre:</strong> Novel, African-American literature, Magical realism</p>
        <p><strong>Pages:</strong> Approximately 324 pages (Vintage International)</p>
        <p><strong>Summary:</strong> 
          Beloved is a novel by Toni Morrison that tells the story of Sethe, an escaped slave who is haunted by the ghost of her deceased daughter. The novel explores themes of slavery, motherhood, and the legacy of trauma.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1632283781i/6149.jpg
" alt="Beloved" />
      </div>
    </div>
  );
}

export default Book13;

