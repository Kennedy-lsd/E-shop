import { useState, useEffect } from "react";
import { UserDetails } from "../components/UserDetail";
import "../index.scss";

function Swagger() {
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
    document.title = "Swagger";
  }, []);

  return (
    <div>
      <div className="swaggerLable">Welcome to Swagger !</div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          createUser();
        }}
      >
        <div>
          <label htmlFor="username">Username: </label>
          <input
            type="text"
            name="username"
            id="username"
            value={username}
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="email">Email: </label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <br />
        <div>
          <label htmlFor="password">Password: </label>
          <input
            type="text"
            name="password"
            id="password"
            value={password}
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        <div>
          <button>Create</button>
        </div>
      </form>
      <div>
        {users.map((user) => (
          <UserDetails key={user._id} user={user} setUsers={setUsers} />
        ))}
      </div>
    </div>
  );
}

export default Swagger;
