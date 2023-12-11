import { useState, useEffect } from "react";
import Logout from "./Logout";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        const result = await response.json(); // Await the Promise
        console.log(result);
        setProducts(result);
      } catch (error) {
        setError(error);
      }
    }
    getAllProducts();
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
          <a className="button" href="/login">
            Login
          </a>
        </>
      )}
      <div className="allProductsCard">
        {!error &&
          products.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.img}
                alt="there should be an img here, whoops!"
              />
              <p className="product-card">{product.title}</p>
              <p className="product-card">${product.price}</p>
              <button
                className="button"
                onClick={() => {
                  navigate(`/${product.id}`);
                }}
              >
                View Product
              </button>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
