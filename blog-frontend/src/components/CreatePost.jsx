import React, { useState } from 'react';
import axios from 'axios';

const CreatePost = ({ onPostCreated, token }) => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('http://localhost:5000/api/posts', { title, body }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    setTitle('');
    setBody('');
    onPostCreated();
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded mb-4">
      <h2 className="text-lg font-semibold mb-2">Create New Post</h2>
      <input
        className="block w-full border p-2 mb-2"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        required
      />
      <textarea
        className="block w-full border p-2 mb-2"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        placeholder="Post body"
        required
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded" type="submit">
        Publish Post
      </button>
    </form>
  );
};

export default CreatePost;
