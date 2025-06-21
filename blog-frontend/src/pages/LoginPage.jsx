import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLoginSuccess = (token) => {
    onLogin(token);         // update state in App
    navigate('/admin');     // redirect to admin page
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
      <LoginForm onLogin={handleLoginSuccess} />
    </div>
  );
};

export default LoginPage;
