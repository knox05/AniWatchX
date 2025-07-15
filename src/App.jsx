// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AnimeDetails from "./pages/AnimeDetails";
import WatchPage from "./pages/WatchPage";
import Login from "./pages/Login";       // ✅ Add this
import Signup from "./pages/Signup";     // ✅ Add this
import "./styles/App.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/login" element={<Login />} />     {/* ✅ New Route */}
        <Route path="/signup" element={<Signup />} />   {/* ✅ New Route */}
      </Routes>
    </Router>
  );
};

export default App;
