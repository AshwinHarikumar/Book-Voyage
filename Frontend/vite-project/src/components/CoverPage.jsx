import { Container } from '@mui/material'
import React from 'react'
import BooksList from './admin/BooksList'
import BookViewPage from './BookViewPage'
import SearchBar from './SearchBar'
import NavbarUser from './NavbarUser'



const CoverPage = () => {
  return (
    <div>
      <br/>
      <NavbarUser/>
           
      <br/>
     <BookViewPage/>
  
    </div>
  )
}

export default CoverPage
