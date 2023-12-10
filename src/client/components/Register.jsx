import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({ setToken }) => {
  // Define state variables for name, password, email, and navigation
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchToken = async (name, email, password) => {
      try {
        // Send a POST request to the registration API endpoint
        const response = await fetch('http://localhost:3000/api/users/register', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            password,
          })
        });
        // Parse the response as JSON
        const result = await response.json();
        console.log(result);

        // Check if the registration was successful
        if (response.ok) {
          // Clear the input fields
          setName("");
          setEmail("");
          setPassword("");

          // Sign in the user after successful registration
          const signInResponse = await fetch('http://localhost:3000/api/users/login', {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              email,
              password,
            })
          });

          // Check if the sign-in was successful
          if (!signInResponse.ok) {
            // Handle sign-in error
            const signInError = await signInResponse.json();
            console.error('Sign-in failed:', signInError);
            return;
          }

          // Parse the sign-in response as JSON
          const signInResult = await signInResponse.json();
          console.log(signInResult);

          // Store the user's ID in localStorage and update the token state
          localStorage.setItem("token", signInResult.user.id);
          setToken(signInResult);

          // Redirect to the homepage after successful sign-up and sign-in
          navigate('/');
        } else {
          // Handle registration error
          console.error('Registration failed:', result);
        }
      } catch (error) {
        // Handle unexpected errors
        console.error('An unexpected error occurred:', error);
      }
    }

    // Call the nested function to fetch the token
    fetchToken(name, email, password);
  }

  // Render the registration form
  return (
    <>
      <h2 className="Sign-In">
        Register below!<br />
      </h2>
      <form className='styleForm' onSubmit={handleSubmit}>
        <label>
          Name: <input
            className='input'
            value={name} type="text"
            onChange={(e) => setName(e.target.value)}
            minLength={3}
            placeholder="Enter your name"
            required />
        </label>
        <br />
        <label>
          Email: <input
            className='input'
            value={email}
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            required />
        </label>
        <br />
        <label>
          Password: <input
            className='input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={9}
            placeholder="Enter your password"
            required />
        </label>
        <br />
        <button className='button' type="submit">Sign Up</button>
        <p>Already have an account?<br />
          <a href="./login">Sign In</a> </p>
        <a href="/">Home</a>
      </form>
    </>
  )
}

// Export the SignUpForm component as the default export
export default SignUpForm;
