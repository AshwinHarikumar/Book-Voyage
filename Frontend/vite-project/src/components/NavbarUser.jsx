import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import React from 'react';
import { Link } from 'react-router-dom';

const NavbarUser = ({ userId }) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar 
          position="fixed" 
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
            <Link to="/coverpage" style={{ textDecoration: "none", color: "white" }}>HOME</Link>
          </Button>
          <Button>
            <Link to="/buybook" style={{ textDecoration: "none", color: "white" }}>RENT BOOKS</Link>
          </Button>
          <Button>
            <Link to="/logout" style={{ textDecoration: "none", color: "white" }}>LOGOUT</Link>
          </Button>
          
          <IconButton color="inherit" component={Link} to={`/profile`}>
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      
      <Toolbar />
    </Box>
  );
}

export default NavbarUser;
