import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { Typography } from '@mui/material'
import { UserProvider } from './UserContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  
  
    <UserProvider>
    <BrowserRouter>
    <App />
    </BrowserRouter>
    </UserProvider>
    
    
   
  </React.StrictMode>,

)
ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById('root')
);