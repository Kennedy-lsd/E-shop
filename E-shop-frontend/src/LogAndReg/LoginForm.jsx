/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import logo from "../assets/icons/logo.svg";
import { useNavigate } from "react-router-dom";

export function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [error, setError] = useState(null);

  const handleLogin = async (usernameInput, password, email) => {
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/auth/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username: usernameInput, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create product");
      }

      const data = await response.json();
      const { token, username: returnedUsername, _id } = data;

      localStorage.setItem("jwtToken", token);
      localStorage.setItem("username", returnedUsername);
      localStorage.setItem("userId", _id);

      setUsername(returnedUsername);
      fetchProtectedData(token);
    } catch (error) {
      setError(error.message); // Set error message in state
      console.error("Error during login:", error.message);
    }
  };

  const fetchProtectedData = async (token) => {
    setError(null);
    try {
      const response = await fetch(
        "http://localhost:8000/api/auth/local/status",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch protected data");
      }

      const data = await response.json();
      console.log("Protected data:", data);
    } catch (error) {
      setError(error.message);
      console.error("Error fetching protected data:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);
    try {
      const formData = new FormData(event.target);
      const username = formData.get("username");
      const password = formData.get("password");
      const emailInput = formData.get("email");

      handleLogin(username, password, emailInput);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (username) {
      navigate("/shop/main");
    }
  }, [username, navigate]);

  return (
    <div className="pb-2">
      {/* Reserve space for the alert */}
      <div
        style={{
          minHeight: "50px", // Fixed height for the alert container
          marginBottom: "1rem",
        }}
      >
        {error && (
          <div
            className="alert alert-danger alert-dismissible fade show"
            role="alert"
            style={{ fontSize: "0.875rem", padding: "0.5rem" }}
          >
            {error}
          </div>
        )}
      </div>

      <main className="form-signin w-25 pt-5 m-auto text-center">
        {!username && (
          <form onSubmit={handleSubmit}>
            <img
              className="mb-2"
              src={logo}
              alt="logo"
              width="72"
              height="57"
            />
            <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="name@example.com"
                required
              />
              <label htmlFor="email">Email address</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="username"
                name="username"
                placeholder="Username"
                required
              />
              <label htmlFor="username">Username</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Password"
                required
              />
              <label htmlFor="password">Password</label>
            </div>

            <button className="w-100 btn btn-lg btn-primary" type="submit">
              Sign in
            </button>
            <p className="pt-2">Don't have an account?</p>
            <Link to={"/"}>Sign up</Link>
            <p className="mt-5 mb-3 text-muted">&copy; 2024</p>
          </form>
        )}
      </main>
    </div>
  );
}
