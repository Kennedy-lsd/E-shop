import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

function Navbar({ username, handleLogout }) {
  const navigate = useNavigate()

  const handleToMainPage = () => {
    navigate("/shop/main")
  }
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" onClick={handleToMainPage} style={{ cursor: "pointer" }}>
          ShopHome
        </a>
        <span>{username ? username : "Guest"}</span>
        {username && (
          <button onClick={handleLogout} className="btn btn-secondary">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}

Navbar.propTypes = {
  username: PropTypes.string,
  handleLogout: PropTypes.func.isRequired,
};

export default Navbar;
