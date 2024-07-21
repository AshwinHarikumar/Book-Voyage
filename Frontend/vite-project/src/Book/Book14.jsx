import React, { useState } from 'react';
import './Book1.css';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book14 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>In Search of Time</h1>
        <p><strong>Author:</strong> Marcel Proust</p>
        <p><strong>Published:</strong> 1913–1927 (seven volumes)</p>
        <p><strong>Genre:</strong> Novel, Modernist literature</p>
        <p><strong>Pages:</strong> Varies by edition</p>
        <p><strong>Summary:</strong> 
          In Search of Lost Time (À la recherche du temps perdu) is a novel by Marcel Proust that is considered one of the greatest works of literature. It explores themes of memory, time, and the nature of art through the narrator's reflection on his past experiences.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTj9yNvWlA2dDfSiOfMf0-1eFDR7upRvvOhzA&s" alt="In Search of Lost Time" />
      </div>
    </div>
  );
}

export default Book14;

