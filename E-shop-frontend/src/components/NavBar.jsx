import PropTypes from "prop-types";

function Navbar({ username, handleLogout }) {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <a className="navbar-brand" href="#">
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
