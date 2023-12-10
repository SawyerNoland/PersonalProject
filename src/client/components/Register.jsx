import React, {useState} from "react";
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({setToken}) => {
  const [name, setName] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchToken = async (name, email, password) => {
      try {
        // send a post request to our register end point to sign a new user up
        const response = await fetch('http://localhost:5432/project/register', {
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name,
            password,
            email
          })
        });

      // Send response as Json
      const result = await response.json();
      console.log(result);

      if (response.ok) {
        setName("");
        setPassword("");
        setEmail("");
      }

      // after a user is signed up for the first time there will be a subsequent post request to the login page so they dont have to go and login after signing up

      const signInResponse = await fetch('http://localhost:5432/project/login', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email,
          password,
        })
      });

      // check if sign in response worked 
      if (!signInResponse.ok) {
        const signInError = await signInResponse.json();
        console.log('there was an issue signing up:',signInError);

        const signInResult = await signInResponse.json();
        console.log(signInResult);

          // set the users token in local storage
          // will be used later to conditionally render items to users v.s. admins
        localStorage.setItem("token", signInResult.user.id);
        setToken(signInResult);

        // redirection to home page after sign up
        navigate('/')
      }
      } catch (error) {
        console.log('uh oh there was an error fetching token', error);
      }
    }
    fetchToken(name, email, password)
  }

  // what to be rendered below
  return (
    <>
    <h2 className="signUpH2">Sign Up</h2>
    <form onSubmit={handleSubmit}>
    <label>
        Email: <input type="email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Please enter your email"
        required
        />
      </label>
      <label>
        Name: <input type="text"
        className="input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Please enter your name"
        required
        />
      </label>
      <label>
        Password: <input type="password"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter a password"
        required
        />
      </label>
      <br />
      <button className="button" type="submit">Sign Up</button>
      <p className="bottom-p">Already have an account?<a href="/login">Login</a></p>
    </form>
    </>
  )
}

export default SignUpForm;