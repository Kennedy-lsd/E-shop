import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Navbar({ username, handleLogout }) {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleToMainPage = () => {
    navigate("/shop/main");
  };

  const handleProfileClick = () => {
    if (userId) {
      navigate(`/shop/main/user/${userId}`);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
      <div className="container">
        <a
          className="navbar-brand fw-bold"
          onClick={(e) => {
            e.preventDefault();
            handleToMainPage();
          }}
          style={{ cursor: "pointer" }}
        >
          StyleShop
        </a>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {username ? (
          <div>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item dropdown">
                  <span
                    className="nav-link dropdown-toggle"
                    id="userDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ cursor: "pointer" }}
                    onClick={(e) => e.preventDefault()}
                  >
                    <span className="fw-bold text-primary">{username}</span>

                    <ul
                      className="dropdown-menu dropdown-menu-end"
                      aria-labelledby="userDropdown"
                    >
                      {username && (
                        <>
                          <li>
                            <a
                              className="dropdown-item"
                              onClick={handleProfileClick}
                            >
                              View Profile
                            </a>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <a className="dropdown-item" onClick={handleLogout}>
                              Logout
                            </a>
                          </li>
                        </>
                      )}
                    </ul>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          "Guest"
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  username: PropTypes.string,
  handleLogout: PropTypes.func,
};

export default Navbar;
