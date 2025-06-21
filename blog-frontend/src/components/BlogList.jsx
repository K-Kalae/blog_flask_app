import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BlogList = () => {
  const [posts, setPosts] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/posts');
        console.log('Fetched posts:', res.data);
        setPosts(res.data.posts || res.data); // Adjust if API returns an array
      } catch (err) {
        console.error('Error fetching posts:', err);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setPosts(posts.filter(post => post.id !== id));
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  return (
    <div className="space-y-4">
      {posts.length === 0 && <p className="text-gray-500">No posts found.</p>}
      {posts.map(post => (
        <div key={post.id} className="border p-4 rounded shadow">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-gray-700">{post.body}</p> {/* ✅ Now using body */}
          {token && (
            <button
              onClick={() => handleDelete(post.id)}
              className="mt-2 text-red-600 hover:underline"
            >
              🗑️ Delete
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default BlogList;
