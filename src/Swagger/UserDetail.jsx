import { useState } from "react";
import propTypes from "prop-types";

export function UserDetails({ user, setUsers }) {
  const [isEdit, setIsEdit] = useState(false);
  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);

  const handleSave = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${user._id}`,
        {
          method: "PATCH", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, email }), 
        }
      );
  
      if (!response.ok) {
        throw new Error(response.error || "Unknown error occurred");
      }
  
      const updatedUser = await response.json();
  
      
      setUsers((currentUserState) =>
        currentUserState.map((currentUser) =>
          currentUser._id === user._id
            ? { ...currentUser, username: updatedUser.username, email: updatedUser.email }
            : currentUser
        )
      );
  
      setIsEdit(false);
    } catch (error) {
      console.error("Failed to update user:", error.message);
    }
  };
  

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:8000/api/users/${user._id}`,
        {
          method: "DELETE", 
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      // Update users state by filtering out the deleted user
      setUsers((prevState) =>
        prevState.filter((currentUser) => currentUser._id !== user._id)
      );
    } catch (error) {
      console.error("Failed to delete user:", error.message);
    }
  };

  return (
    <div>
      <div >
        <b >Id: </b>
        <span>{user._id}</span>
        <br />
        <b>Username: </b>
        {isEdit ? (
          <input
            name="username"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        ) : (
          <span>{user.username}</span>
        )}
        <br />
        <b>Email: </b>
        {isEdit ? (
          <input
            name="email"
            id="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        ) : (
          <span>{user.email}</span>
        )}
      </div>
      <div>
        <button onClick={() => setIsEdit((currentState) => !currentState)}>
          Edit
        </button>
        <button onClick={handleDelete}>Delete</button>

        {isEdit && <button onClick={handleSave}>Save</button>}
      </div>
    </div>
  );
}

UserDetails.propTypes = {
  user: propTypes.shape({
    _id: propTypes.string.isRequired,
    username: propTypes.string.isRequired,
    email: propTypes.string.isRequired,
  }).isRequired,
  setUsers: propTypes.func.isRequired,
};
