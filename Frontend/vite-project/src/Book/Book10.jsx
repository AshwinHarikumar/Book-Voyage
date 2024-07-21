import React, { useState } from 'react';
import './Book1.css'; 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book10 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>The Lord of the Rings</h1>
        <p><strong>Author:</strong> J.R.R. Tolkien</p>
        <p><strong>Published:</strong> July 29, 1954 (The Fellowship of the Ring)</p>
        <p><strong>Genre:</strong> High fantasy, Adventure</p>
        <p><strong>Pages:</strong> Approximately 1,178 pages (Complete edition, HarperCollins)</p>
        <p><strong>Summary:</strong> 
          The Lord of the Rings is an epic high fantasy novel by J.R.R. Tolkien. It follows the quest to destroy the One Ring, which holds great power, and the journey of Frodo Baggins and his companions through Middle-earth to Mount Doom.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://resizing.flixster.com/djVK6dFvap-Ns2F0wfIfRXKR-hE=/ems.cHJkLWVtcy1hc3NldHMvbW92aWVzL2RiNThlOGNmLWY2MTQtNDE1Mi1iM2NkLTMyOTk5ZDM1NjA5Mi5qcGc=
" alt="The Lord of the Rings" />
      </div>
    </div>
  );
}

export default Book10;

