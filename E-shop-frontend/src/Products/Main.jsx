import { useState, useEffect } from "react";
import { Products } from "./Products";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/NavBar";
import "./Main.scss"

function Main() {
  const navigate = useNavigate();
  const [products, setProducts] = useState(null);
  const [username, setUsername] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchProducts = async (category = "") => {
    try {
      let url = "http://localhost:8000/api/products";
      if (category) {
        url += `?department=${category}`; 
      }
      const response = await fetch(url);
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
    localStorage.removeItem("userId");
    setUsername(null);
    navigate("/login");
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    fetchProducts(category);
  };

  const handleShowAllClick = () => {
    setSelectedCategory(null); 
    fetchProducts(); 
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


  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Reusable Navbar */}
      <Navbar username={username} handleLogout={handleLogout} />

      {/* Filter Buttons */}
      <div className="container my-4 pb-2 mb-2 d-flex justify-content-center">
        <button
          className={`btn ${selectedCategory === "shoes" ? "btn-primary" : "btn-outline-primary"} mx-2 category-btn`}
          onClick={() => handleCategoryClick("shoes")}
        >
          Shoes
        </button>
        <button
          className={`btn ${selectedCategory === "t-shirts" ? "btn-primary" : "btn-outline-primary"} mx-2 category-btn`}
          onClick={() => handleCategoryClick("t-shirts")}
        >
          T-Shirts
        </button>
        <button
          className="btn btn-outline-secondary mx-2 category-btn"
          onClick={handleShowAllClick} 
        >
          All Products
        </button>
      </div>

      {/* Main Content */}
      <div className="container my-4 flex-grow-1">
        <div className="row">
          {products && products.length > 0 ? (
            products.map((product) => (
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
            ))
          ) : (
            <div className="text-center w-100">
              <h5>No products of this category</h5>
            </div>
          )}
        </div>
      </div>

      <div className="container d-flex justify-content-center pb-4">
        <button
          className="w-30 text-center mt-auto btn btn-primary rounded-pill px-4 py-2"
          type="submit"
          onClick={handleCreateClick}
        >
          Create New Product
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
