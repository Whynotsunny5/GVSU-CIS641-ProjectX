import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";

function Profile() {
  // Updated userProfile with posts that now contain image and description
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    description: "",
    profilePic: "",
    posts: [],
  });
  const bufferToBase64 = (buffer) => {
    if (!buffer) {
      return null; // or a default value
    }
    const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return btoa(binary);
  };
  
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const loggedInUsername = localStorage.getItem("username");
        const response = await axios.get(
          "http://localhost:8080/getUserProfile/" + loggedInUsername
        );
        const {
          id,
          username,
          email,
          first_name,
          last_name,
          phone_number,
          description,
          profile_pic,
        } = response.data; // Destructure to exclude id and password
        // Inside fetchProfileData
        const postsResponse = await axios.get(
          `http://localhost:8080/getUserPosts/${id}`
        );
        const postsWithImages = postsResponse.data.map(post => {
          const imageBase64String = post.image ? bufferToBase64(post.image.data) : null;
          return {
            ...post,
            image: imageBase64String ? `data:image/png;base64,${imageBase64String}` : "path/to/default/post/image.png"
          };
        });
        // In your component where you display the image
        setUserProfile({
          // Update the state using the setUserProfile function
          username: username,
          email: email,
          firstName: first_name,
          lastName: last_name,
          phoneNumber: phone_number,
          description: description,
          profilePic: profile_pic,
          // Include posts if they are part of the response, or leave the empty array
          posts: postsWithImages || [],
        });
      } catch (error) {
        console.error("Error fetching profile data:", error);
        // Handle error here
      }
    };

    fetchProfileData();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserProfile({ ...userProfile, profilePic: file });
    }
  };

  const handleLike = (postId) => {
    // Logic to handle like
    console.log(`Liked post ${postId}`);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({ ...userProfile, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("username", userProfile.username);
    formData.append("email", userProfile.email);
    formData.append("firstName", userProfile.firstName);
    formData.append("lastName", userProfile.lastName);
    formData.append("phoneNumber", userProfile.phoneNumber);
    formData.append("description", userProfile.description);
    formData.append("profilePic", userProfile.profilePic);

    console.log(userProfile.profilePic);
    try {
      await axios.put(`http://localhost:8080/updateUserProfile`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const base64String = userProfile.profilePic ? bufferToBase64(userProfile.profilePic.data) : null;
  return (
    <div>
      {isEditing ? (
        <div className="profile">
          <form onSubmit={handleSubmit}>
            <label>
              Profile Picture:
              <input type="file" onChange={handleImageChange} />
            </label>
            <label>
              First Name:
              <input
                type="text"
                name="firstName"
                value={userProfile.firstName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Last Name:
              <input
                type="text"
                name="lastName"
                value={userProfile.lastName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={userProfile.email}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Phone Number:
              <input
                type="tel"
                name="phoneNumber"
                value={userProfile.phoneNumber}
                onChange={handleInputChange}
              />
            </label>
            <label>
              Bio:
              <textarea
                name="description"
                value={userProfile.description}
                onChange={handleInputChange}
              />
            </label>
            <button type="submit">Submit</button>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        <>
          <div className="profile">
            <div className="user-info">
            <img
              src={base64String ? `data:image/png;base64,${base64String}` : "path/to/default/image.png"}
              alt="Profile"
              className="profile-pic"
            />
              <h2>{userProfile.username}'s Profile</h2>
              <p>First Name: {userProfile.firstName!=="null"? userProfile.firstName: " "}</p>
              <p>Last Name: {userProfile.lastName!=="null"? userProfile.lastName: ""}</p>
              <p>Email: {userProfile.email!=="null"? userProfile.email: ""}</p>
              <p>Phone Number: {userProfile.phoneNumber!=="null"? userProfile.phoneNumber: ""}</p>
              <p>Bio: {userProfile.description!=="null" ? userProfile.description: ""}</p>
              {/* Repeat for other non-editable fields: lastName, email, etc. */}
              <button onClick={() => setIsEditing(true)}>Edit Profile</button>
            </div>
          </div>
          <h3>Art Posts</h3>
          <div className="user-posts">
            {userProfile.posts.map((post) => (
              <div key={post.id} className="post">
                <img src={post.image} alt={post.title} className="post-image" />
                <h4>{post.title}</h4>
                <p>{post.description}</p>
                <button onClick={() => handleLike(post.id)}>Like</button>
                <span>{post.likes} Likes</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Profile;
