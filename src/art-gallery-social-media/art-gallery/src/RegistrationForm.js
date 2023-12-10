import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import './RegistrationForm.css';

function RegistrationForm() {
  const navigation = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const formFields = [
    {
      label: 'Username',
      type: 'text',
      name: 'username',
      value: userData.username,
    },
    {
      label: 'Email',
      type: 'email',
      name: 'email',
      value: userData.email,
    },
    {
      label: 'Password',
      type: 'password',
      name: 'password',
      value: userData.password,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleRegistration = async () => {
    try {
      const response = await axios.post('http://localhost:8080/register', userData);
      console.log('Registration successful:', response.data);
      navigation('/login')
    } catch (error) {
      setError(error.response ? error.response.data.message : 'Registration failed');
    }
  };

  return (
    <div>
      <h1 class="heading">Art Gallery</h1>
    <div className="form-container">
      <h2>Registration</h2>
      <form>
        {formFields.map((field, index) => (
          <div key={index}>
            <label>{field.label}:</label>
            <input
              type={field.type}
              name={field.name}
              value={field.value}
              onChange={handleInputChange}
            />
          </div>
        ))}
        {error && <div className="error-message">{error}</div>} {/* Display error message */}
        <button type="button" onClick={handleRegistration}>
          Register
        </button>
      </form>
    </div>
    </div>
  );
}

export default RegistrationForm;
