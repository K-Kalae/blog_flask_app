import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import AdminPage from './pages/AdminPage';
import Navbar from './components/Navbar';

const App = () => {
  const [token, setToken] = useState('');
  const [refreshPosts, setRefreshPosts] = useState(false);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    setToken(savedToken || '');
  }, []);

  const handleLogin = (newToken) => {
    localStorage.setItem('token', newToken);
    setToken(newToken);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
  };

  const handlePostCreated = () => {
    setRefreshPosts(!refreshPosts);
  };

  return (
    <Router>
      <Navbar token={token} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<HomePage key={refreshPosts} />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route
          path="/admin"
          element={
            <AdminPage
              token={token}
              onLogout={handleLogout}
              onPostCreated={handlePostCreated}
            />
          }
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
