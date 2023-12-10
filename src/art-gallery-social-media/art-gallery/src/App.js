import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import Dashboard from './Dashboard';
import CreatePost from './CreatePost';
import './App.css';
import PostDetails from './PostDetails';
import ArtistDetails from './ArtistDetails';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set to true if token is present
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("token", token); // Store the token on login
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Clear the token on logout
    setIsLoggedIn(false); // Update the state to reflect that the user is logged out
  };

  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Routes>
            <Route path="/" element={!isLoggedIn ? <RegistrationForm /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={isLoggedIn ? <Dashboard onLogout={handleLogout} /> : <Navigate to="/login" />} />
            <Route path="/login" element={!isLoggedIn ? <LoginForm onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:postId" element={<PostDetails />} />
            <Route path="/artist/:artistId" element={<ArtistDetails/>} />
          </Routes>
          <nav>
            {!isLoggedIn && (
              <>
                <Link to="/" className="toggle-message">Register</Link>
                <span> | </span>
                <Link to="/login" className="toggle-message">Login</Link>
              </>
            )}
          </nav>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
