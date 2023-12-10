import { useState, useEffect } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";

function App() {
  const [token, setToken] = useState([]);
  // add amdin functionality here

  const storageToken = localStorage.getItem("token");
  useEffect(() => {
    async function getToken(storageToken) {
      if (storageToken) {
        setToken(storageToken)
      } else {
        return;
      }
    }
    getToken(storageToken);
  }, [token, storageToken]);

  return (
    <div className='App'>
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path='/register' element={<Register token={token} setToken={setToken}/>}/>
        <Route path='/login' element={<Login token={token} setToken={setToken}/>}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
