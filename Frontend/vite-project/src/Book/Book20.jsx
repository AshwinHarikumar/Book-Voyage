import React, { useState } from 'react';
import './Book1.css'; 
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';

const Book20 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };
  return (
    <div className="book-container">
      <div className="book-info">
        <h1>One Flew Over the Cuckoo's Nest</h1>
        <p><strong>Author:</strong> Ken Kesey</p>
        <p><strong>Published:</strong> February 1962</p>
        <p><strong>Genre:</strong> Novel, Psychological fiction</p>
        <p><strong>Pages:</strong> Approximately 272 pages (Penguin Books)</p>
        <p><strong>Summary:</strong> 
          One Flew Over the Cuckoo's Nest is a novel by Ken Kesey set in a psychiatric hospital, narrated by Chief Bromden, a patient who observes the arrival of Randle McMurphy and the ensuing power struggle with Nurse Ratched. The novel explores themes of individuality, sanity, and freedom.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://m.media-amazon.com/images/I/61Lpsc7B3jL._AC_UF1000,1000_QL80_.jpg" alt="One Flew Over the Cuckoo's Nest" />
      </div>
    </div>
  );
}

export default Book20;

