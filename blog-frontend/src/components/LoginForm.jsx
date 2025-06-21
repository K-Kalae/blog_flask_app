import React, { useState } from 'react';
import axios from 'axios';

const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
      });

      const token = res.data.access_token;
      localStorage.setItem('token', token);
      onLogin(token);
      setErrorMsg('');
    } catch (err) {
      setErrorMsg('Login failed. Check your credentials.');
    }
  };

  return (
    <form onSubmit={handleLogin} className="p-4 border rounded mb-4">
      <h2 className="text-lg font-semibold mb-2">Admin Login</h2>

      <div className="mb-2">
        <label htmlFor="username" className="block mb-1 font-medium">
          Username
        </label>
        <input
          id="username"
          name="username"
          className="block w-full border p-2"
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          autoComplete="username"
          required
        />
      </div>

      <div className="mb-2">
        <label htmlFor="password" className="block mb-1 font-medium">
          Password
        </label>
        <input
          id="password"
          name="password"
          className="block w-full border p-2"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
          required
        />
      </div>

      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">
        Login
      </button>

      {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
    </form>
  );
};

export default LoginForm;
