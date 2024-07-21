import React, { useState } from 'react';
import './Book1.css'; 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book15 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>The Book Thief</h1>
        <p><strong>Author:</strong> Markus Zusak</p>
        <p><strong>Published:</strong> 2005</p>
        <p><strong>Genre:</strong> Historical fiction, Novel</p>
        <p><strong>Pages:</strong> Approximately 552 pages (Knopf Books for Young Readers)</p>
        <p><strong>Summary:</strong> 
          The Book Thief is a novel by Markus Zusak set in Nazi Germany, narrated by Death. It tells the story of Liesel Meminger, a young girl who steals books to share with others and finds solace in reading during a time of war and hardship.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://m.media-amazon.com/images/M/MV5BYmI4ODg4ZjktMDAwZS00Y2MwLWFhNDEtYjlkZTYwNmUwYjk4XkEyXkFqcGdeQXVyMTQyMTMwOTk0._V1_.jpg" alt="The Book Thief" />
      </div>
    </div>
  );
}

export default Book15;

