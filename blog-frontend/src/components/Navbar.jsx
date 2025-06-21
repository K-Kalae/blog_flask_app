import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ token, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-100 p-4 mb-6 shadow-sm flex justify-between items-center">
      <div className="text-xl font-bold">
        <Link to="/">📝 My Blog</Link>
      </div>
      <div className="space-x-4">
        {token ? (
          <>
            <Link to="/admin" className="text-blue-700 font-medium">
              Admin
            </Link>
            <button
              onClick={handleLogout}
              className="text-red-600 hover:underline"
            >
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="text-blue-700 font-medium">
            Login
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
