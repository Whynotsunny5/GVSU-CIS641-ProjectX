// validation.js

// Regular expression patterns for email and username validation
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernamePattern = /^[a-zA-Z0-9_]+$/;

// Function to validate an email
function validateEmail(email) {
  if (!emailPattern.test(email)) {
    throw new Error('Invalid email format');
  }
}

// Function to validate a username
function validateUsername(username) {
  if (!usernamePattern.test(username)) {
    throw new Error('Invalid username format');
  }
}

// Function to validate a password with a minimum length of 5 characters
function validatePassword(password) {
  if (password.length < 5) {
    throw new Error('Password must be at least 5 characters long');
  }
}

module.exports = { validateEmail, validateUsername, validatePassword };
