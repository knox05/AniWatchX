import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const user = localStorage.getItem("user");

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        AniWatch<span>X</span>
      </div>
      <ul className="navbar__links">
        <li><Link to="/">Home</Link></li>
        {user ? (
          <li><button className="logout-btn" onClick={handleLogout}>Logout</button></li>
        ) : (
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
