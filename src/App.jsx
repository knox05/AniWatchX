import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import AnimeDetails from "./pages/AnimeDetails";
import WatchPage from "./pages/WatchPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import GenrePage from "./pages/GenrePage"; // Reusable genre component
import "./styles/App.css";

// 🔁 Genre Wrapper with genre name-to-ID mapping
const GenreWrapper = () => {
  const { genreName } = useParams();

  const genreMap = {
    Action: 1,
    Comedy: 4,
    Romance: 22,
    Fantasy: 10,
  };

  const genreId = genreMap[genreName];
  if (!genreId) return <div style={{ padding: "100px", color: "white" }}>Genre not found</div>;

  return <GenrePage genre={genreId} />;
};

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/anime/:id" element={<AnimeDetails />} />
        <Route path="/watch/:id" element={<WatchPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* ✅ Dynamic Genre Route */}
        <Route path="/genre/:genreName" element={<GenreWrapper />} />
      </Routes>
    </Router>
  );
};

export default App;
