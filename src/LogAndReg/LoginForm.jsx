/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import logo from '../assets/icons/logo.svg'
import { useNavigate } from "react-router-dom";


export function LoginForm() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);

  const handleLogin = async (usernameInput, password, email) => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/auth", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, username: usernameInput, password }),
      });

      if (!response.ok) {
        throw new Error("Login failed");
      }

      const data = await response.json();
      const { token, username: returnedUsername } = data;

      localStorage.setItem("jwtToken", token);
      localStorage.setItem("username", returnedUsername);

      setUsername(returnedUsername);
      fetchProtectedData(token);
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const fetchProtectedData = async (token) => {
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
      console.error("Error fetching protected data:", error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get("username");
    const password = formData.get("password");
    const emailInput = formData.get("email");

    handleLogin(username, password, emailInput);
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
          <Link to={'/'}>Sign up</Link>
          <p className="mt-5 mb-3 text-muted">&copy; 2024</p>
        </form>
      )}
    </main>
  );
}