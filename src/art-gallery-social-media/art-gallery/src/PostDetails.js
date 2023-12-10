import React, { useState, useEffect } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';

function PostDetails() {
  const location = useLocation();
  const { postId } = useParams();
  const [post, setPost] = useState(location.state ? location.state.post : null);

  useEffect(() => {
    if (!post) {
      // Fetch the post by ID if it's not in the state
      axios.get(`http://localhost:8080/getPost/${postId}`)
        .then(response => setPost(response.data))
        .catch(error => console.error('Error fetching post:', error));
    }
  }, [postId, post]);

  if (!post) {
    return <div>Loading post...</div>;
  }
  
  return (
    <div>
       <div>
      <h2>{post.title}</h2>
      <p>By <Link to={`/artist/${post.user_id}`}>{post.user_id}</Link></p>
      <p>Price: {post.price}</p>
      {post.image && <img src={`data:image/jpeg;base64,${post.image}`} alt={post.title} />}
      {/* Add other post details as needed */}
    </div>
    </div>
  );
}

export default PostDetails;
