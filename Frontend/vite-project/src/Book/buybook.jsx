import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import './buybook.css';
import NavbarUser from '../components/NavbarUser';

function BookShoppingPage() {
  const [books, setBooks] = useState([]);
  const [rentedBooks, setRentedBooks] = useState([]);
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchBooks();
    fetchRentedBooks();
    fetchFavoriteBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('http://localhost:3001/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const fetchRentedBooks = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) return;

    try {
      const response = await axios.get(`http://localhost:3001/users/${userId}/rentedBooks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      setRentedBooks(response.data);
    } catch (error) {
      console.error('Error fetching rented books:', error);
    }
  };

  const fetchFavoriteBooks = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteBooks')) || [];
    setFavoriteBooks(favorites);
  };

  const handleRent = async (book) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('You need to be logged in to rent a book.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3001/users/${userId}/rent`, {
        bookId: book._id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        alert(`Book ${book.title} rented successfully`);
        setRentedBooks([...rentedBooks, book]);
      } else {
        alert('Error renting book: ' + response.data.message);
      }
    } catch (error) {
      console.error('Error renting book:', error.response || error);
      alert('Error renting book');
    }
  };

  const handleReturn = async (book) => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      alert('You need to be logged in to return a book.');
      return;
    }

    try {
      const response = await axios.post(`http://localhost:3001/users/${userId}/return`, {
        bookId: book._id
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.data.success) {
        alert(`Book ${book.title} returned successfully`);
        removeFromRentedBooks(book); 
      } else {
        alert(`Book ${book.title} returned successfully`);
        removeFromRentedBooks(book); 
      }
    } catch (error) {
      console.error('Error returning book:', error.response || error);
      alert('Error returning book');
    }
  };

  const removeFromRentedBooks = (bookToRemove) => {
    const updatedRentedBooks = rentedBooks.filter((book) => book._id !== bookToRemove._id);
    setRentedBooks(updatedRentedBooks);
  };

  const handleFavorite = (book) => {
    let updatedFavorites;
    if (favoriteBooks.some(fav => fav._id === book._id)) {
      updatedFavorites = favoriteBooks.filter(fav => fav._id !== book._id);
    } else {
      updatedFavorites = [...favoriteBooks, book];
    }
    setFavoriteBooks(updatedFavorites);
    localStorage.setItem('favoriteBooks', JSON.stringify(updatedFavorites));
  };

  return (
    <>
      <NavbarUser />
      <div className="book-shopping-page">
        <h2 style={{ color: '#fff' }}>Book Shopping Cart</h2>

        <h3 style={{ color: '#fff' }}>Rented Books</h3>
        <div className="rentedbook-list">
          {rentedBooks.map((book) => (
            <div key={book._id} className="book-card">
              <div className="book-details">
                <h3>{book.title}</h3>
                <button onClick={() => handleReturn(book)}>Return</button>
              </div>
            </div>
          ))}
        </div>

        <h3 style={{ color: '#fff' }}>Available Books</h3>
        <div className="book-list">
          {books.map((book) => (
            <div key={book._id} className="book-card">
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
                <div className="book-actions">
                  {rentedBooks.some((item) => item._id === book._id) ? (
                    <button onClick={() => handleReturn(book)}>Return</button>
                  ) : (
                    <button onClick={() => handleRent(book)}>Rent</button>
                  )}
                  {/* <button
                    onClick={() => handleFavorite(book)}
                    className={`favorite-icon ${favoriteBooks.some(fav => fav._id === book._id) ? 'favorited' : ''}`}
                  >
                    {favoriteBooks.some(fav => fav._id === book._id) ? (
                      <FavoriteIcon />
                    ) : (
                      <FavoriteBorderIcon />
                    )}
                  </button> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default BookShoppingPage;
