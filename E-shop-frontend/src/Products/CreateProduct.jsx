import { useState, useEffect } from "react";
import Navbar from "../components/NavBar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

export function CreateProduct() {
  const navigate = useNavigate()
  const [username, setUsername] = useState(null);
  const [formData, setFormData] = useState({
    image: null,
    title: "",
    rating: "",
    colorway: "",
    brand: "",
    model: "",
    releaseDate: "",
    department: "",
    code: "",
  });

  const [error, setError] = useState(null); 

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    setUsername(null);
    navigate("/login");
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setFormData({
      ...formData,
      image: event.target.files[0],
    });
  };

  const createProduct = async (e) => {
    e.preventDefault();
    setError(null); // Reset any previous errors

    try {
      const productData = new FormData();
      productData.append("image", formData.image);
      productData.append("title", formData.title);
      productData.append("rating", formData.rating);
      productData.append("colorway", formData.colorway);
      productData.append("brand", formData.brand);
      productData.append("model", formData.model);
      productData.append("releaseDate", formData.releaseDate);
      productData.append("department", formData.department);
      productData.append("code", formData.code);

      const response = await fetch("http://localhost:8000/api/products", {
        method: "POST",
        body: productData,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create product");
      }

      const data = await response.json();
      console.log("Product created:", data);

      setFormData({
        image: null,
        title: "",
        rating: "",
        colorway: "",
        brand: "",
        model: "",
        releaseDate: "",
        department: "",
        code: "",
      });
      navigate("/shop/main")
    } catch (error) {
      setError(error.message); // Set error message in state
    }
  };

  useEffect(() => {
    const storedUserData = localStorage.getItem("username");
    if (storedUserData) {
      setUsername(storedUserData);
    }
  }, []);

  return (
    <div>
      <Navbar username={username} handleLogout={handleLogout} />
      <div className="container mt-5">
        <h2 className="text-center mb-4">Create a New Product</h2>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form className="col-md-8 mx-auto" onSubmit={createProduct}>
          <div className="form-group mb-3">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              className="form-control"
              name="image"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="rating">Rating</label>
            <input
              type="number"
              className="form-control"
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              required
              min="0"
              max="5"
              step="1"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="colorway">Colorway</label>
            <input
              type="text"
              className="form-control"
              name="colorway"
              value={formData.colorway}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="brand">Brand</label>
            <input
              type="text"
              className="form-control"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="model">Model</label>
            <input
              type="text"
              className="form-control"
              name="model"
              value={formData.model}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="releaseDate">Release Date</label>
            <input
              type="date"
              className="form-control"
              name="releaseDate"
              value={formData.releaseDate}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="department">Department</label>
            <input
              type="text"
              className="form-control"
              name="department"
              value={formData.department}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="code">Product Code</label>
            <input
              type="text"
              className="form-control"
              name="code"
              value={formData.code}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">
            Create Product
          </button>
        </form>
      </div>
    </div>
  );
}
