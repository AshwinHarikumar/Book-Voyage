import React, { useState } from 'react';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import './Book1.css'; // Import CSS file for styling

const Book1 = () => {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <div className="book-container">
      <div className="book-info">
        <h1>To Kill a Mockingbird</h1>
        <p><strong>Author:</strong> Harper Lee</p>
        <p><strong>Published:</strong> July 11, 1960</p>
        <p><strong>Genre:</strong> Novel, Southern Gothic</p>
        <p><strong>Pages:</strong> 281 pages (Mass Market Paperback)</p>
        <p><strong>Summary:</strong> 
          To Kill a Mockingbird is a novel by Harper Lee published in 1960. It was immediately successful, winning the Pulitzer Prize, and has become a classic of modern American literature. The plot and characters are loosely based on the author's observations of her family, her neighbors, and an event that occurred near her hometown of Monroeville, Alabama, in 1936, when she was 10 years old.
        </p>
        <button onClick={handleLike} className={`like-button ${liked ? 'liked' : ''}`}>
          {liked ? <ThumbUpIcon /> : <ThumbUpOffAltIcon />}
        </button>
      </div>
      <div className="book-image">
        <img src="https://www.dramaticpublishing.com/media/catalog/product/cache/1/image/300x436/9df78eab33525d08d6e5fb8d27136e95/t/o/to_kill_a_mockingbird_cover-t34.jpg" alt="To Kill a Mockingbird" />
      </div>
    </div>
  );
}

export default Book1;
