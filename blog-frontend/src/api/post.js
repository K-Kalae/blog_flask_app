import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const fetchPosts = () => axios.get(`${BASE_URL}/posts`);
export const createPost = (data) => axios.post(`${BASE_URL}/posts`, data);
export const deletePost = (id) => axios.delete(`${BASE_URL}/posts/${id}`);
