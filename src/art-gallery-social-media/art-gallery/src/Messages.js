import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Messages.css'; // Ensure you have a CSS file for styling

function Messages() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [recipient, setRecipient] = useState('');
  const loggedInUserId = localStorage.getItem("userId"); // Replace with the actual logged-in user's ID

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/getMessages/${loggedInUserId}`);
        setMessages(response.data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, [loggedInUserId]);

  const sendMessage = async () => {
    if (newMessage.trim() !== '' && recipient.trim() !== '') {
      try {
        await axios.post('http://localhost:8080/sendMessage', {
          senderId: loggedInUserId,
          receiverId: recipient,
          content: newMessage,
        });

        setNewMessage('');
        setRecipient('');
        // Optionally fetch messages again to update the list
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <div className="messages-container">
      <div className="messages-list">
        <h2>Inbox</h2>
        <ul>
          {messages.map(message => (
            <li key={message.id}>
              <strong>{message.sender}:</strong> {message.content}
            </li>
          ))}
        </ul>
      </div>

      <div className="send-message-form">
        <h2>Send a Message</h2>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="Recipient's user ID"
        />
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here"
        />
        <button onClick={sendMessage}>Send Message</button>
      </div>
    </div>
  );
}

export default Messages;
