import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FaPlus } from 'react-icons/fa';
import './Posts.css';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const response = await axios.get('http://localhost:8080/getAllPosts');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="posts-container">
      <div className="posts">
        <h2> ART GALLERY </h2>
        <Link to="/createpost" className="create-post-link">
          <FaPlus size={24} />
        </Link>
        <div className="posts-list">
          {posts.map(post => (
            <div key={post.id} className="post">
              <Link to={{ pathname: `/post/${post.id}`,state: { post }}}>
              <h3>{post.title}</h3>
              <p>By {post.user_id}</p>
              <p>Price {post.price}</p>
              {post.image && <img src={`data:image/jpeg;base64,${post.image}`} alt={post.title} />}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Posts;
