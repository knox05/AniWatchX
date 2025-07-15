import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/HeroCarousel.css";

const HeroCarousel = () => {
  const [spotlight, setSpotlight] = useState([]);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/anime?filter=airing")
      .then(res => setSpotlight(res.data.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (spotlight.length) {
        setIndex((prev) => (prev + 1) % spotlight.length);
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [spotlight]);

  if (!spotlight.length) return null;

  const anime = spotlight[index];

  return (
    <div
      className="hero-section"
      style={{ backgroundImage: `url(${anime.images.jpg.large_image_url})` }}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <span className="hero-spotlight">#{index + 1} Spotlight</span>
          <h1 className="hero-title">{anime.title}</h1>

          <div className="hero-meta">
            <span>MOVIES</span>
            <span>{anime.duration || "Unknown"}</span>
            <span>{anime.aired?.prop?.from?.year || "Unknown"}</span>
            <span className="quality-badge">HD</span>
            <span className="quality-badge">SUB</span>
          </div>

          <p className="hero-description">
            {anime.synopsis?.slice(0, 240)}...
          </p>

          <div className="hero-buttons">
            <button
              className="hero-watch-now"
              onClick={() => navigate(`/watch/${anime.mal_id}`)}
            >
              ▶ Watch Now
            </button>
            <button
              className="hero-detail"
              onClick={() => navigate(`/anime/${anime.mal_id}`)}
            >
              Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
