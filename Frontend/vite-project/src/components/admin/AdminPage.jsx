import React from 'react';
import { Link } from 'react-router-dom';
import './AdminPage.css';
import NavBarAdmin from './NavbarAdmin';
import NavBar2 from './Navbar2';
import { Typography, Container, Paper } from '@mui/material';

const AdminPage = () => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh' }}>
      <NavBar2 />
      <Container maxWidth="md" style={{ flex: 1, marginTop: '70px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Paper elevation={3} style={{ padding: '100px', width: '100%', maxWidth: '900px' }}>
          <Typography variant="h4" gutterBottom align="center">
            Welcome to the Admin Page
          </Typography>
          <Typography variant="body1" paragraph>
            Welcome to the Admin Dashboard! This platform empowers you to manage the bookstore efficiently. Here, you can oversee user accounts, add or remove books from our collection, and monitor transactions.
          </Typography>
          <Typography variant="body1" paragraph>
            Our intuitive interface allows for seamless management of both users and inventory, ensuring a smooth experience for everyone. Should you need any assistance, feel free to reach out for support. 
          </Typography>
          <Typography variant="body1" paragraph>
            Thank you for contributing to our community!
          </Typography>
        </Paper>
      </Container>
      <footer style={{ textAlign: 'center', padding: '1rem', backgroundColor: '#333', color: '#fff',marginTop:'140px' }}>
        <Typography variant="body2" color="inherit">
          &copy; 2024 Bookstore. All rights reserved.
        </Typography>
      </footer>
    </div>
  );
};

export default AdminPage;
