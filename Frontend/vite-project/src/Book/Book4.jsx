import React, { useState } from 'react';
import './Book1.css'; 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book4 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>Adventures of Huckleberry Finn</h1>
        <p><strong>Author:</strong> Mark Twain</p>
        <p><strong>Published:</strong> December 10, 1884</p>
        <p><strong>Genre:</strong> Novel, Adventure fiction, Satire</p>
        <p><strong>Pages:</strong> Approximately 366 pages (Penguin Classics)</p>
        <p><strong>Summary:</strong> 
          Adventures of Huckleberry Finn is a novel by Mark Twain, published in 1884. It follows the journey of Huck Finn, a young boy escaping an abusive father and his attempts to help Jim, a runaway slave, escape to freedom. The novel is noted for its realistic portrayal of people and places along the Mississippi River and its use of vernacular speech.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://m.media-amazon.com/images/I/51EU6zFkbEL._AC_UF1000,1000_QL80_.jpg" />
      </div>
    </div>
  );
}

export default Book4;

