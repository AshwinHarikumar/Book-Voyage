import React from 'react';
import { Typography, Container, Box, CssBaseline, Button } from '@mui/material';
import NavBar from '../NavBar';
import './HomePage.css';

const HomePage = () => {
  return (
    <>
    <NavBar/>
     <React.Fragment>
     
     <CssBaseline />
     <Box
       sx={{
         backgroundImage: `url("./Bg1.jpg")`,
         backgroundSize: 'cover',
         backgroundPosition: 'center',
         minHeight: '96vh',
         position: 'relative',
         display: 'flex',
         alignItems: 'center',
         justifyContent: 'center',
         textAlign: 'center',
         color: 'white',
         padding: '2rem',
       }}
     >
       <div className="overlay" style={{
         position: 'absolute',
         top: 0,
         left: 0,
         right: 0,
         bottom: 0,
         backgroundColor: 'rgba(0, 0, 0, 0.6)',
         zIndex: 1,
       }} />
       <Container maxWidth="md" style={{ position: 'relative', zIndex: 2 }}>
         <Typography variant="h2" component="h1" gutterBottom>
           "Welcome to the Book Voyage"
         </Typography>
         <Typography variant="h4" component="h2" gutterBottom>
           Discover a world of knowledge and adventure
         </Typography>
         <Typography variant="body1" gutterBottom style={{ fontSize: '1.2rem' }}>
           Browse our collection of books and find your next great read.
         </Typography>

         <Typography variant="body1" style={{ marginBottom: '2rem' }}>
           At Book Voyage, we believe in the transformative power of literature. Our carefully curated selection features everything from timeless classics to contemporary masterpieces. Whether you're a passionate reader or just starting your journey, we have something for everyone. Join us in exploring the magic of books!
         </Typography>

         <Box sx={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
           <Button variant="contained" color="primary" href="/signin">
             Sign In
           </Button>
           <Button variant="contained" color="secondary" href="/signup">
             Sign Up
           </Button>
         </Box>
       </Container>
     </Box>
     
     <footer style={{ textAlign: 'center', padding: '0.5rem', backgroundColor: '#333', color: '#fff' }}>
       <Typography variant="body2" color="inherit">
         &copy; 2024 Bookstore. All rights reserved.
       </Typography>
     </footer>
   </React.Fragment>
    
    </>
   
  );
};

export default HomePage;
