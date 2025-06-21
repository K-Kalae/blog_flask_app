import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CreatePost from '../components/CreatePost';

const AdminPage = ({ token, onLogout, onPostCreated }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="text-right mb-4">
        <button
          onClick={handleLogoutClick}
          className="bg-red-100 text-red-700 px-3 py-1 rounded"
        >
          Logout
        </button>
      </div>

      <h2 className="text-xl font-semibold mb-4">Create a New Post</h2>
      <CreatePost onPostCreated={onPostCreated} token={token} />
    </div>
  );
};

export default AdminPage;
