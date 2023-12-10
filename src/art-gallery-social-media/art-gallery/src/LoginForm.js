import React, { useState } from "react";
import axios from "axios";
import "./LoginForm.css";

function LoginForm({ onLogin }) {
  const [error, setError] = useState('');
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const formFields = [
    {
      label: "Username",
      type: "text",
      name: "username",
      value: loginData.username,
    },
    {
      label: "Password",
      type: "password",
      name: "password",
      value: loginData.password,
    },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...loginData, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        loginData
      );
      console.log("Login successful:", response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.user.username);
      localStorage.setItem("userId",response.data.user.id)
      onLogin(true); // Invoking the callback to signal successful login
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // If we receive a 401 status, we set the error state to the error message from the server
        setError('Invalid username or password');
      } else {
        // For all other errors, you can set a generic error message
        setError('An error occurred. Please try again later.');
      }
      // Log the error or handle it as needed
      console.error('Login error:', error);
    }
  };

  return (
    <div>
      <h1 class="heading">Art Gallery</h1>
      <div className="form-container">
        <h2>Login</h2>
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
          <button type="button" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
