import { useState, useEffect } from "react";
import { Products } from "./Products";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";

function Main() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [username, setUsername] = useState(null);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/products");
      const data = await response.json();
      setProducts(data);
      if (!response.ok) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleCreateClick = () => {
    navigate("/shop/main/create");
  };

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("username");
    if (storedUserData) {
      setUsername(storedUserData);
    } else {
      console.error("User is undefined");
    }
  }, []);

  
  useEffect(() => {
    fetchProducts();
  }, []);

  if (!products) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Reusable Navbar */}
      <Navbar username={username} handleLogout={handleLogout} />

      {/* Main Content */}
      <div className="container my-4 flex-grow-1">
        <div className="row">
          {products.map((product) => (
            <div
              key={product._id}
              className="col-lg-3 col-md-4 col-sm-6 col-6 mb-3"
            >
              <div
                className="card border-0 shadow-sm"
                style={{ minHeight: "200px" }}
              >
                <Products product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="container d-flex justify-content-center pb-4">
        <button
          className="w-30 text-center mt-auto btn btn-primary"
          type="submit"
          onClick={handleCreateClick}
        >
          Create new Product
        </button>
      </div>

      {/* Sticky Footer */}
      <footer className="bg-dark text-white text-center py-3 mt-auto">
        <div className="container">
          &copy; {new Date().getFullYear()} ShopHome. All rights reserved.
        </div>
      </footer>
    </div>
  );
}

export default Main;
