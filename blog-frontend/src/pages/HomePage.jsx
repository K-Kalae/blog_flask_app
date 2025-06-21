import React from 'react';
import BlogList from '../components/BlogList';

const HomePage = () => {
  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">📝 My Blog</h1>
      <BlogList />
    </div>
  );
};

export default HomePage;
