import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = () => {
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
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Transparent background color
          }}
        >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          BOOK VOYAGE
          </Typography>
          <Button ><Link to={"/signin"}style={{textDecoration:"none",color: "white"}}>SIGN IN</Link></Button>
          <Button><Link to={"/signup"}style={{ textDecoration:"none",color: "white"}}>SIGN UP</Link></Button>
        </Toolbar>
      </AppBar>
    </Box>
    </>
  )
}

export default NavBar
