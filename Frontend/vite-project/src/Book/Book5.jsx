import React, { useState } from 'react';
import './Book1.css'; 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book5 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>One Hundred Years of Solitude</h1>
        <p><strong>Author:</strong> Gabriel García Márquez</p>
        <p><strong>Published:</strong> May 30, 1967</p>
        <p><strong>Genre:</strong> Magic realism, Novel</p>
        <p><strong>Pages:</strong> Approximately 417 pages (Harper Perennial Modern Classics)</p>
        <p><strong>Summary:</strong> 
          One Hundred Years of Solitude is a landmark novel by Colombian author Gabriel García Márquez, published in 1967. It tells the multi-generational story of the Buendía family in the fictional town of Macondo, exploring themes of solitude, love, revolution, and the cyclical nature of history. The novel blends magical elements with social and political commentary, becoming a defining work of magic realism.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://cdn2.penguin.com.au/covers/original/9780241968581.jpg" />
      </div>
    </div>
  );
}

export default Book5;

