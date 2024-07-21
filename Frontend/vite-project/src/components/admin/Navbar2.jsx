import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar2 = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
      <AppBar 
          position="static" 
          sx={{
            // backgroundImage: 'url(/Bg2.jpg)', // Relative path to the image in the public folder
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Transparent background color
          }}
        >
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              BOOK VOYAGE
            </Typography>
            
            <Button>
              <Link to="/BooksLists" style={{ textDecoration: "none", color: "white" }}>ViEW BOOKS</Link>
            </Button>
            <Button>
              <Link to="/UserList" style={{ textDecoration: "none", color: "white" }}>VIEW USERS</Link>
            </Button>
            <Button>
              <Link to="/home" style={{ textDecoration: "none", color: "white" }}>LOGOUT</Link>
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}

export default NavBar2;
