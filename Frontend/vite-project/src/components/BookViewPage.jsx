import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './BookViewPage.css';
import { Button } from '@mui/material';

function BookViewPage() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  return (
    <div className="book-view-page">
      {/* <Link to="/buybook" className="buy-books-link">
        <Button className="buy-books-button" variant="contained" color="secondary">
          Rent Books
        </Button>
      </Link> */}
     
      <div className="book-list">
        {books.map((book, index) => (
          <Link to={`/book/${index + 1}`} key={book._id} className="book-card">
            <div className="book-image">
              
              {book.image.startsWith('http') ? (
                <img src={book.image} alt={book.title} />
              ) : (
                <img src={`http://localhost:3001/images/${book.image}`} alt={book.title} />
              )}
            </div>
            <div className="book-details">
              <h3>{book.title}</h3>
              <p>Author: {book.author}</p>
              <p>{book.description}</p>
             
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BookViewPage;
