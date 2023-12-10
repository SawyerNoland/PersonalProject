import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function LogIn({ token, setToken }) {
  // Define state variables for email, password, and navigation
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    
    try {
      // Send a POST request to the login API endpoint
      const response = await fetch('http://localhost:3000/api/users/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
        })
      });

      // Parse the response as JSON
      const result = await response.json();
      
      // Update the token state with the result
      setToken(result);

      // Store the user's ID in localStorage
      localStorage.setItem("token", result.user.id);

      // Log the token, result, and navigate to the home page
      console.log(token);
      console.log(result);
      navigate('/');
      
      // Return the result (optional)
      return result;
    } catch (error) {
      // Handle errors by logging them
      console.error(error);
    }
  }

  // Render the login form
  return (
    <>
      <h2 className="Sign-In">Please log in!</h2>
      <form className='styleForm' onSubmit={handleSubmit}>
        <label>
          Email: <input className='input' value={email} type="text" onChange={(e) => setEmail(e.target.value)} required />
        </label>
        <br />
        <label>
          Password: <input className='input' type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </label>
        <button className='button' type="submit">Log In</button>
        <p className='href'>Don't have an account?<a href="./register"> Sign Up</a> </p>
        <a href="/">Home</a>
      </form>
    </>
  );
}

// Export the LogIn component as the default export
export default LogIn;
