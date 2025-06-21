import React from 'react';

const PostItem = ({ post }) => {
  return (
    <div className="mb-4 p-4 border rounded shadow-sm">
      <h3 className="text-lg font-semibold">{post.title}</h3>
      <p className="text-gray-700 mt-1">{post.body}</p>
      <p className="text-sm text-gray-500 mt-2">
        {new Date(post.created_at).toLocaleString()}
      </p>
    </div>
  );
};

export default PostItem;
