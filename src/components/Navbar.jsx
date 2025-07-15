import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={handleLogoClick}>
        AniWatch
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/genre/Action">Action</Link></li>
        <li><Link to="/genre/Comedy">Comedy</Link></li>
        <li><Link to="/genre/Romance">Romance</Link></li>
        <li><Link to="/genre/Fantasy">Fantasy</Link></li>
      </ul>

      <div className="auth-links">
        <Link to="/login">Login</Link>
        <span>|</span>
        <Link to="/signup">Signup</Link>
      </div>
    </nav>
  );
};

export default Navbar;
