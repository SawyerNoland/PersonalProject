import { useState, useEffect } from "react";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate= useNavigate

  useEffect(() => {
    // Check if there is a token with a number in local storage
    const token = localStorage.getItem("token");

    if (token && !isNaN(parseInt(token))) {
      // If there is a token with a number, set isLoggedIn to true
      setIsLoggedIn(true);
    } else {
      // If there is no token or it doesn't have a number, set isLoggedIn to false
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <>
      {isLoggedIn ? (
        <>
          <button className="button" onClick={Logout}>
            logout
          </button>
        </>
      ) : (
        <>
          <a href="/login">Login</a>
        </>
      )}

      <p>home</p>
    </>
  );
};

export default Home;
