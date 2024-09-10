import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { StarRating } from "../components/StarRating";
import Navbar from "../components/NavBar";

export function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [username, setUsername] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    setUsername(null);
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("username");
    if (storedUserData) {
      setUsername(storedUserData);
    }
  }, []);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/products/${productId}`);
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error);
        }
        setProduct(data);
      } catch (error) {
        console.error(error.message);
      }
    };

    if (productId) {
      fetchProductDetails();
    }
  }, [productId]); // productId is the only dependency here

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar username={username} handleLogout={handleLogout} />

      <div className="container my-4">
        <div className="row">
          <div className="col-md-6">
            <div className="card border-0">
              <img
                src={`http://localhost:8000/${product.image}`}
                alt={product.title}
                className="img-fluid card-img-top"
                style={{ objectFit: "contain", maxHeight: "400px" }}
              />
            </div>
          </div>

          <div className="col-md-6">
            <h1 className="mb-3">{product.title}</h1>

            <div className="mb-3">
              <strong>Rating: </strong>
              <StarRating rating={product.rating}></StarRating>
            </div>

            <ul className="list-unstyled">
              <li><strong>Brand: </strong> {product.brand}</li>
              <li><strong>Model: </strong> {product.model}</li>
              <li><strong>Colorway: </strong> {product.colorway}</li>
              <li><strong>Release Date: </strong> {product.releaseDate}</li>
              <li><strong>Department: </strong> {product.department}</li>
              <li><strong>Product Code: </strong> {product.code}</li>
            </ul>

            <div className="mt-4">
              <h3 className="text-success">$199.99</h3>
              <button className="btn btn-primary btn-lg mt-3">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
