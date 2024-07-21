import React, { useEffect, useState } from 'react';
import { 
  Container, 
  Typography, 
  CircularProgress, 
  List, 
  ListItem, 
  ListItemText, 
  Button 
} from '@mui/material';
import NavbarUser from './NavbarUser';

const RentedBooksPage = () => {
  const [rentedBooks, setRentedBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchRentedBooks = async () => {
      try {
        const response = await fetch(`http://localhost:3001/users/${userId}/rentedBooks`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch rented books.');
        }

        const data = await response.json();
        setRentedBooks(data || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    if (userId) {
      fetchRentedBooks();
    } else {
      setError('User ID not found.');
      setLoading(false);
    }
  }, [userId]);

  const handleReturnBook = async (bookId) => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userId}/return`, {
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
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <>
      <NavbarUser />
      <Container maxWidth="lg" sx={{ mt: 6, marginTop: 20 }}>
        <Typography variant="h5" gutterBottom sx={{ color: 'black' }}>
          Rented Books
        </Typography>
        <List>
          {rentedBooks.length > 0 ? rentedBooks.map((book) => (
            <ListItem key={book._id}>
              <ListItemText primary={book.title} />
              <Button onClick={() => handleReturnBook(book._id)} variant="outlined" color="secondary">
                Return
              </Button>
            </ListItem>
          )) : <Typography sx={{ color: 'black' }}>No rented books.</Typography>}
        </List>
      </Container>
    </>
  );
};

export default RentedBooksPage;
