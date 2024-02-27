import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/style.css';

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', body: '' });
 
  useEffect(() => {
    fetchPosts();
  }, []);
 
  const fetchPosts = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
      setPosts(response.data);
    } catch (error) {
      console.error('Erro ao buscar posts:', error);
    }
  };
 
  const handleChange = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/posts', newPost);
      setPosts([...posts, response.data]);
      setNewPost({ title: '', body: '' });
    } catch (error) {
      console.error('Erro ao adicionar post:', error);
    }
  };
 
  return (
    <div className='background'>
        <div className='menu'>
            <div className='title'>
                <h1>Posts</h1>
            </div>
      <form className='form' onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={newPost.title}
          onChange={handleChange}
          placeholder="Título"
        />
        <textarea
          name="body"
          value={newPost.body}
          onChange={handleChange}
          placeholder="Conteúdo"
        />
        <button type="submit">Adicionar Post</button>
      </form>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
 
export default Posts; 