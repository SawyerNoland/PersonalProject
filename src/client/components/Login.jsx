import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

function Login({token ,setToken}) {
  const [email, setEmail] =useState("")
  const [password, setPassword] =useState("")
  const navigation = useNavigate();

  async function handleSubmit(e) {
    e.preventDefualt();

    try {
      const response = await fetch('http://localhost:5432/project/login', {
        method: "POST",
        headers: {'Content-Type' : 'application/json'},
        body: JSON.stringify({
          email, password,
        })
      });

      const result = await response.json()
      setToken(result)

      localStorage.setItem("token", result.user.id);
      console.log(token);
      console.log(result);
      // see what the outcome is for both token and result for testing to see if its correct and matching

      // if its successful the user will be navigated to home 
      navigation('/')
      return result;

    } catch (error) {
      console.log('error at handle submit', error);
    }
  }
  return (
    <>
    <h2 className='signUpH2'>Login</h2>
    <br />
    <form onSubmit={handleSubmit}>
    <label>
        Email: <input type="email"
        className="input"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
        />
      </label>
      <label>
        Password: <input type="password"
        className="input"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
        />
      </label>
      <button className='button' onClick={handleSubmit}>Login</button>
      <br />
      <p className="bottom-p">Dont have an account? <a href="/register">Register here</a></p>
    </form>
    </>
  );
}

export default Login;