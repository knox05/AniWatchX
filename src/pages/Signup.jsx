import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify({ email, password }));
    alert("Account created!");
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>Signup</h2>
      <form onSubmit={handleSignup}>
        <input type="email" placeholder="Email" required value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Signup</button>
        <p onClick={() => navigate("/login")} className="auth-switch">Already have an account? Login</p>
      </form>
    </div>
  );
};

export default Signup;
