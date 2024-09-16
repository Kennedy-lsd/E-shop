import { useState, useEffect } from "react";
import { UserDetails } from "./UserDetail";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "../index.scss";
import { useNavigate } from "react-router-dom";

function Swagger() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users");
      const data = await response.json();
      setUsers(data);
      if (!response.ok) {
        throw new Error(data.error);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleToMainPage = () => {
    navigate("/shop/main");
  };

  const createUser = async () => {
    try {
      const response = await fetch("http://localhost:8000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error);
      }

      const newUser = {
        _id: data._id,
        username,
        email,
        password,
      };

      setUsers((currentUserState) => [...currentUserState, newUser]);
    } catch (error) {
      console.error("Validation error", error.message);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container my-5">
      <h1 className="text-center mb-4 swaggerLable">Welcome to Swagger!</h1>
      <button className="btn btn-secondary mb-4" onClick={handleToMainPage}>
        Back to Main Page
      </button>
      <form
        className="mb-4"
        onSubmit={(event) => {
          event.preventDefault();
          createUser();
        }}
      >
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
            required
          />
        </div>
        <button className="btn btn-primary">Create User</button>
      </form>

      <div className="card">
        <div className="card-header">User List</div>
        <ul className="list-group list-group-flush">
          {users.map((user) => (
            <li key={user._id} className="list-group-item">
              <UserDetails key={user._id} user={user} setUsers={setUsers} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Swagger;
