import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ArtistDetails.css';

function ArtistDetails() {
  const { artistId } = useParams();
  const [artist, setArtist] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:8080/getArtist/${artistId}`)
      .then(response => setArtist(response.data))
      .catch(error => console.error('Error fetching artist:', error));
  }, [artistId]);

  if (!artist) {
    return <div className="loading">Loading artist...</div>;
  }

  const bufferToBase64 = (buffer) => {
    if (!buffer) {
      return null;
    }
    const binary = buffer.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return btoa(binary);
  };

  const base64String = artist[0].profile_pic ? bufferToBase64(artist[0].profile_pic.data) : null;

  return (
    <div className="artist-details-container">
      <img
        src={base64String ? `data:image/png;base64,${base64String}` : "path/to/default/image.png"}
        alt="Profile"
        className="profile-pic"
      />
      <h1 className="artist-details-heading">{artist[0].username}</h1>
      <h2 className="artist-detail">Name: {artist[0].first_name} {artist[0].last_name}</h2>
      <h2 className="artist-detail">Email: {artist[0].email}</h2>
      <h2 className="artist-detail">Phone: {artist[0].phone_number}</h2>
      <h2 className="artist-detail">Description: {artist[0].description}</h2>
    </div>
  );
}

export default ArtistDetails;
