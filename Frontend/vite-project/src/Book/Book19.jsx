
import React, { useState } from 'react';
import './Book1.css'; 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book19 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>The Adventures of Sherlock Holmes</h1>
        <p><strong>Author:</strong> Sir Arthur Conan Doyle</p>
        <p><strong>Published:</strong> 1892</p>
        <p><strong>Genre:</strong> Detective fiction, Mystery</p>
        <p><strong>Pages:</strong> Varies by edition</p>
        <p><strong>Summary:</strong> 
          The Adventures of Sherlock Holmes is a collection of short stories by Sir Arthur Conan Doyle featuring the famous detective Sherlock Holmes and his companion Dr. John Watson. The stories depict Holmes's investigative skills and his encounters with various intriguing cases.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://m.media-amazon.com/images/I/71-YShuOLdL._AC_UF1000,1000_QL80_.jpg" alt="The Adventures of Sherlock Holmes" />
      </div>
    </div>
  );
}

export default Book19;
