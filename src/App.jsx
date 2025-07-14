import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AnimeDetails from "./pages/AnimeDetails";
import WatchPage from "./pages/WatchPage";
import "./styles/App.css"; // Optional: create for global styles

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/watch/:id" element={<WatchPage />} />
      </Routes>
    </Router>
  );
};

export default App;
