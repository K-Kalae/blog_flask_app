import React, { useEffect, useState } from 'react';
import { fetchPosts } from '../api/post';
import PostItem from './PostItem';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts().then(res => setPosts(res.data)).catch(err => console.error(err));
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">All Posts</h2>
      {posts.map(post => (
        <PostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default BlogList;
