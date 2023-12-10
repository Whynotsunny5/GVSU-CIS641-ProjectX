import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreatePost.css';

function CreatePost() {
  const [userId, setUserId] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState(null);

  useEffect(() => {
    // Retrieve userId from local storage
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('title', title);
    formData.append('description', description);
    formData.append('price', price);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await axios.post('http://localhost:8080/createPost', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Post created:', response.data);
      // Handle post creation success (e.g., redirect or display a message)
    } catch (error) {
      console.error('Error creating post:', error);
      // Handle errors (e.g., display an error message)
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="create-post-container">
      <div>
      <h2>Create a New Post</h2>
      <form onSubmit={handleSubmit}>
        {/* User ID field is now hidden as it's fetched from local storage */}
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <input
          type="file"
          onChange={handleImageChange}
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
    </div>
  );
}

export default CreatePost;
