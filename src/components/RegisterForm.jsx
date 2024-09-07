import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import googleIcon from "../assets/icons/googleAuth.svg"; 
import logo from '../assets/icons/logo.svg'
import './styles/RegisterForm.scss'


export function RegisterForm() {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    email: "",
    username: "",
    password: "",
  });

  return (
    <main className="form-signin w-25 pt-5 m-auto text-center">
      <form
        onSubmit={(event) => {
          event.preventDefault();

          const formData = new FormData(event.target);
          const email = formData.get("email");
          const username = formData.get("username");
          const password = formData.get("password");

          fetch("http://localhost:8000/api/auth/reg", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              username,
              password,
            }),
          })
            .then(async (response) => {
              if (!response.ok) {
                const dataError = await response.json();
                throw new Error(JSON.stringify(dataError.result));
              }
              return response.json();
            })
            .then((data) => {
              console.log(data.message, data);
              navigate("/login");
            })
            .catch((error) => {
              console.error("Error:", error.message);
            });
        }}
      >
        <img
          className="mb-2"
          src={logo}
          alt="logo"
          width="72"
          height="57"
        />
        <h1 className="h3 mb-3 fw-normal">Please sign up</h1>

        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            placeholder="name@example.com"
            value={formFields.email}
            onChange={(event) => {
              setFormFields((currentState) => ({
                ...currentState,
                email: event.target.value,
              }));
            }}
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
            value={formFields.username}
            onChange={(event) => {
              setFormFields((currentState) => ({
                ...currentState,
                username: event.target.value,
              }));
            }}
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
            value={formFields.password}
            onChange={(event) => {
              setFormFields((currentState) => ({
                ...currentState,
                password: event.target.value,
              }));
            }}
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className="mt-3">
          <p>Or sign up with</p>
          <a href="http://localhost:8000/api/auth/google">
            <img
            className="pb-3 img-google"
              src={googleIcon}
              alt="Google Sign In"
              width="50"
              height="50"
            />
          </a>
        </div>

        <button className="w-100 btn btn-lg btn-primary" type="submit">
          Sign up
        </button>
        <p className="pt-2">Already have an account?</p>
        <Link to={"/login"}>Sign in</Link>
        <p className="mt-5 mb-3 text-muted">&copy; 2024</p>
      </form>
    </main>
  );
}
