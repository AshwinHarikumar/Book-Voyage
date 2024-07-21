import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './BookList.css';
import NavBarAdmin from './NavbarAdmin';

function BooksList() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editBookId, setEditBookId] = useState(null);

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

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!title || !author || !description) {
      alert('Please fill in all required fields (Title, Author, Description).');
      return;
    }

    let formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('description', description);

    if (imageUrl) {
      formData.append('image', imageUrl);
    } else if (imageFile) {
      formData.append('image', imageFile);
    } else {
      alert('Please provide an Image URL or choose a file.');
      return;
    }

    try {
      if (editMode && editBookId) {
        // Update existing book
        const response = await axios.put(`http://localhost:3001/books/${editBookId}`, formData);
        console.log(response.data);
        alert('Book updated successfully!');
      } else {
        // Add new book
        const response = await axios.post('http://localhost:3001/books', formData);
        console.log(response.data);
        alert('Book added successfully!');
      }
      clearForm();
      fetchBooks();
    } catch (error) {
      console.error('Error adding/updating book:', error);
      alert('Failed to add/update book. Please try again.');
    }
  };

  const handleEditBook = (bookId) => {
    const bookToEdit = books.find((book) => book._id === bookId);
    if (bookToEdit) {
      setTitle(bookToEdit.title);
      setAuthor(bookToEdit.author);
      setDescription(bookToEdit.description);
      setImageUrl(bookToEdit.image); 
      setEditMode(true);
      setEditBookId(bookId);
    }
  };

  const handleDeleteBook = async (bookId) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await axios.delete(`http://localhost:3001/books/${bookId}`);
        if (response.status === 200) {
          alert('Book deleted successfully!');
          fetchBooks(); 
        } else {
          alert('Failed to delete book. Please try again.');
        }
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('Failed to delete book. Please try again.');
      }
    }
  };

  const clearForm = () => {
    setTitle('');
    setAuthor('');
    setDescription('');
    setImageFile(null);
    setImageUrl('');
    setEditMode(false);
    setEditBookId(null);
  };

  return (
    <> 
    <NavBarAdmin/>
    <div className="books-list">
      
    <h2 className="section-title">{editMode ? 'Edit Book' : 'Add a Book'}</h2>
    <form onSubmit={handleFormSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        required
      />
      <label htmlFor="author">Author:</label>
      <input
        type="text"
        id="author"
        value={author}
        onChange={(event) => setAuthor(event.target.value)}
        required
      />
      <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        required
      />
      <label htmlFor="image">Image (URL or File):</label>
      <input
        type="text"
        id="image"
        value={imageUrl}
        onChange={(event) => setImageUrl(event.target.value)}
        placeholder="Enter image URL"
      />
      <input
        type="file"
        id="image-file"
        onChange={(event) => setImageFile(event.target.files[0])}
        accept="image/*"
      />
      <button className={editMode ? 'update-button' : 'add-button'} type="submit">
        {editMode ? 'Update Book' : 'Add Book'}
      </button>
    </form>
    
    <h2 className="section-title">Book List</h2>
    <div className="book-cards">
      {books.map((book) => (
        <div key={book._id} className="book-card">
          <div className="book-image">
            <img src={book.image} alt={book.title} />
          </div>
          <div className="book-details">
            <h3>{book.title}</h3>
            <p>Author: {book.author}</p>
            <p>{book.description}</p>
            <div className="button-group">
              <button className="edit-button" onClick={() => handleEditBook(book._id)}>
                Edit
              </button>
              <button className="delete-button" onClick={() => handleDeleteBook(book._id)}>
                Delete
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div></>
   
  );
}

export default BooksList;
