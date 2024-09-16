import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../components/NavBar";
import { Footer } from "../components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import "./UserProfile.scss";

export function UserProfile() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState(null);
  const [isEdit, setIsEdit] = useState(null);

  const handleSave = async () => {
    if (!user || !user._id) {
      console.error("User ID is missing.");
      return;
    }
    
    try {
      console.log("User ID: ", user._id); 
  
      const response = await fetch(
        `http://localhost:8000/api/users/${user._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username }),
        }
      );
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to update user");
      }
  
      const updatedUser = await response.json();
      setUser((currentUser) => ({ ...currentUser, username: updatedUser.username }));
      setIsEdit(false);
      localStorage.setItem("username", updatedUser.username);
      console.log(updatedUser)
    } catch (error) {
      console.error(error.message);
    }
  };
  
  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    setUser(null);
    navigate("/login");
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8000/api/users/${userId}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error);
        }
  
        setUser(data);
      } catch (error) {
        console.error(error.message);
      }
    };
  
    if (userId) {
      fetchUser();
    }
  }, [userId]);
  

  useEffect(() => {
    const storedUserData = localStorage.getItem("username");
    if (storedUserData) {
      setUsername(storedUserData);
    } else {
      console.error("User is undefined");
    }
  }, []);

  if (!user) {
    return (
      <div className="container">
        <div className="text-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only">L</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar username={username} handleLogout={handleLogout} />
      <div className="container mt-4 ">
        <div className="profile-header text-center">
          {isEdit ? (
            <div className="d-flex justify-content-center pb-3">
            <input
              className="form-control form-control-sm edit-user-button "
              type="text"
              name="username"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={(event) => {
                setUsername(event.target.value);
              }}
            />
            </div>
          ) : (
            <h2>{localStorage.getItem("username")}</h2>
          )}

          <p>{user.email}</p>
          <button
            className="btn btn-outline-primary mt-2 btn-sm"
            onClick={() => setIsEdit((currentState) => !currentState)}
          >
            Edit Profile
          </button>
          {isEdit && (
            <button className="btn mt-2 btn-sm" onClick={handleSave}>
              Save
            </button>
          )}
        </div>

        <div className="card mt-4 mx-auto" style={{ maxWidth: "500px" }}>
          <div className="card-body text-center">
            <h4 className="card-title">User Details</h4>
            <p>
              <strong>Your Id: </strong>
              {user._id}
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
