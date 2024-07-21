import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import HomePage from './components/HomePage';
import NavBar from './NavBar';
import ResetPass from './components/ResetPass';
import CoverPage from './components/CoverPage';
import BooksList from './components/admin/BooksList';
import UserList from './components/admin/UserList';
import AdminPage from './components/admin/AdminPage';
import BookShoppingPage from './Book/buybook';
import NavbarUser from './components/NavbarUser';
import ProfilePage from './components/ProfilePage';
import Book1 from './Book/Book1';
import Book2 from './Book/Book2';
import Book3 from './Book/Book3';
import Book4 from './Book/Book4';
import Book5 from './Book/Book5';
import Book6 from './Book/Book6';
import Book7 from './Book/Book7';
import Book8 from './Book/Book8';
import Book9 from './Book/Book9';
import Book10 from './Book/Book10';
import Book11 from './Book/Book11';
import Book12 from './Book/Book12';
import Book13 from './Book/Book13';
import Book14 from './Book/Book14';
import Book15 from './Book/Book15';
import Book16 from './Book/Book16';
import Book17 from './Book/Book17';
import Book18 from './Book/Book18';
import Book19 from './Book/Book19';
import Book20 from './Book/Book20';
import NavBar2 from './components/admin/Navbar2';
import RentedBooksPage from './components/RentedBooksPage';
import NavBarAdmin from './components/admin/NavbarAdmin';
import NavBar3 from './components/NavBar3';

const App = () => {
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('token'));

  const navBarRoutes = [
    '/book/1',
    '/book/2',
    '/book/3',
    '/book/4',
    '/book/5',
    '/book/6',
    '/book/7',
    '/book/8',
    '/book/9',
    '/book/10',
    '/book/11',
    '/book/12',
    '/book/13',
    '/book/14',
    '/book/15',
    '/book/16',
    '/book/17',
    '/book/18',
    '/book/19',
    '/book/20',
    
  ];

  const shouldShowNavBar = navBarRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowNavBar && <NavbarUser />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignIn setToken={setToken} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/reset-password" element={<ResetPass />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/coverpage/*" element={<CoverPage />} />
        <Route path="/BooksLists" element={token ? <BooksList /> : <Navigate to="/signin" />} />
        <Route path="/UserList" element={token ? <UserList /> : <Navigate to="/signin" />} />
        <Route path="/admin1" element={token ? <AdminPage /> : <Navigate to="/signin" />} />
        <Route path="/buybook" element={<BookShoppingPage />} />
        <Route path="/3" element={<NavbarUser />} />
        <Route path="/profile" element={token ? <ProfilePage /> : <Navigate to="/signin" />} />
        <Route path="/book/1" element={<Book1 />} />
        <Route path="/book/2" element={<Book2 />} />
        <Route path="/book/3" element={<Book3 />} />
        <Route path="/book/4" element={<Book4 />} />
        <Route path="/book/5" element={<Book5 />} />
        <Route path="/book/6" element={<Book6 />} />
        <Route path="/book/7" element={<Book7 />} />
        <Route path="/book/8" element={<Book8 />} />
        <Route path="/book/9" element={<Book9 />} />
        <Route path="/book/10" element={<Book10 />} />
        <Route path="/book/11" element={<Book11 />} />
        <Route path="/book/12" element={<Book12 />} />
        <Route path="/book/13" element={<Book13 />} />
        <Route path="/book/14" element={<Book14 />} />
        <Route path="/book/15" element={<Book15 />} />
        <Route path="/book/16" element={<Book16 />} />
        <Route path="/book/17" element={<Book17 />} />
        <Route path="/book/18" element={<Book18 />} />
        <Route path="/book/19" element={<Book19 />} />
        <Route path="/book/20" element={<Book20 />} />
        <Route path="/NavBar2" element={<NavBar2 />} />
        <Route path="/rent" element={<RentedBooksPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
