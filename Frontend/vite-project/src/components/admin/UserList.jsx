import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, CardActions } from '@mui/material';
import './UserList.css';
import NavBarAdmin from './NavbarAdmin';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', age: '', place: '' });
  const [editingUser, setEditingUser] = useState(null);
  const [rentedBooks, setRentedBooks] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:3001/users');
        if (Array.isArray(response.data)) {
          setUsers(response.data);
        } else {
          setError('Unexpected response format');
        }
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = editingUser
        ? await axios.put(`http://localhost:3001/users/${editingUser._id}`, form)
        : await axios.post('http://localhost:3001/users', form);

      setUsers(editingUser
        ? users.map(user => (user._id === editingUser._id ? response.data : user))
        : [...users, response.data]);

      setForm({ firstName: '', lastName: '', email: '', password: '', age: '', place: '' });
      setEditingUser(null);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleEdit = (user) => {
    setForm({ firstName: user.firstName, lastName: user.lastName, email: user.email, password: '', age: user.age, place: user.place });
    setEditingUser(user);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      setUsers(users.filter(user => user._id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const fetchRentedBooks = async (userId) => {
    try {
      console.log(`Fetching rented books for user: ${userId}`);
      const response = await axios.get(`http://localhost:3001/users/${userId}/rentedBooks`);
      setRentedBooks(response.data);
      setSelectedUser(userId);
    } catch (error) {
      console.error('Error fetching rented books:', error);
      setError(error.message);
    }
  };

  const handleReturnBook = async (userId, bookId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/returnBook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ bookId }),
      });

      if (!response.ok) {
        throw new Error('Failed to return book.');
      }

      const updatedRentedBooks = await response.json();
      setRentedBooks(updatedRentedBooks || []);

     
      await fetchRentedBooks(userId);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <NavBarAdmin />
      <div className="user-list-container">
        <h1>User List</h1>
        <form onSubmit={handleSubmit} className="form-container">
          <TextField
            name="firstName"
            label="First Name"
            value={form.firstName}
            onChange={handleChange}
            required
            fullWidth
            className="form-input"
          />
          <TextField
            name="lastName"
            label="Last Name"
            value={form.lastName}
            onChange={handleChange}
            required
            fullWidth
            className="form-input"
          />
          <TextField
            name="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            required
            fullWidth
            className="form-input"
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            value={form.password}
            onChange={handleChange}
            required={!editingUser} 
            fullWidth
            className="form-input"
          />
          <TextField
            name="age"
            label="Age"
            type="number"
            value={form.age}
            onChange={handleChange}
            required
            fullWidth
            className="form-input"
          />
          <TextField
            name="place"
            label="Place"
            value={form.place}
            onChange={handleChange}
            required
            fullWidth
            className="form-input"
          />
          <br />
          <br />
          <Button type="submit" variant="contained" color="primary" style={{ marginRight: '10px' }}>
            {editingUser ? 'Update' : 'Add'}
          </Button>
          <Button variant="contained" color="secondary" onClick={() => { setForm({ firstName: '', lastName: '', email: '', password: '', age: '', place: '' }); setEditingUser(null); }}>
            Clear
          </Button>
        </form>
        <div className="card-container">
          {users.map(user => (
            <Card key={user._id} className="user-card">
              <CardContent className="card-content">
                <h2>{user.firstName} {user.lastName}</h2>
                <p>{user.email}</p>
                <p>Age: {user.age}</p>
                <p>Place: {user.place}</p>
              </CardContent>
              <CardActions className="card-actions">
                <Button onClick={() => handleEdit(user)} variant="contained" color="primary" className="edit-button">
                  Edit
                </Button>
                <Button onClick={() => handleDelete(user._id)} variant="contained" color="secondary">
                  Delete
                </Button>
                <Button onClick={() => fetchRentedBooks(user._id)} variant="contained" color="info">
                  View Rented Books
                </Button>
              </CardActions>
            </Card>
          ))}
        </div>
        {selectedUser && (
          <div className="rented-books-container">
            <h2>Rented Books</h2>
            <div className="rented-books-grid">
              {rentedBooks.length > 0 ? (
                rentedBooks.map(book => (
                  <Card key={book._id} className="rented-book-card">
                    <CardContent className="card-content">
                      <h3>{book.title}</h3>
                      <p>Author: {book.author}</p>
                      <p>Due Date: {book.dueDate}</p>
                    </CardContent>
                    <CardActions className="card-actions">
                      <Button onClick={() => handleReturnBook(selectedUser, book._id)} variant="contained" color="secondary">
                        Return Book
                      </Button>
                    </CardActions>
                  </Card>
                ))
              ) : (
                <p>No rented books</p>
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserList;
