import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faImages, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Messages from './Messages';
import Profile from './Profile';
import FollowedAuthors from './Posts';
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

function Dashboard({ onLogout }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('authors');

  const handleLogout = () => {
    localStorage.removeItem('token'); // Remove the token from storage
    onLogout(false); // Update the App component's state
    navigate('/login'); // Redirect to the login page
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <button onClick={() => setActiveTab('authors')} className={activeTab === 'authors' ? 'active' : ''}>
          <FontAwesomeIcon icon={faImages} size="lg" /><span>Feed</span>
        </button>
        <button onClick={() => setActiveTab('messages')} className={activeTab === 'messages' ? 'active' : ''}>
          <FontAwesomeIcon icon={faEnvelope} size="lg" /><span>Messages</span>
        </button>
        <button onClick={() => setActiveTab('profile')} className={activeTab === 'profile' ? 'active' : ''}>
          <FontAwesomeIcon icon={faUser} size="lg" /><span>Profile</span>
        </button>
        <button onClick={handleLogout} className="logout-button">
          <FontAwesomeIcon icon={faSignOutAlt} size="lg" /><span>Logout</span>
        </button>
      </nav>
      <main className="dashboard-content">
        {activeTab === 'authors' && <FollowedAuthors />}
        {activeTab === 'messages' && <Messages />}
        {activeTab === 'profile' && <Profile />}
      </main>
    </div>
  );
}

export default Dashboard;
