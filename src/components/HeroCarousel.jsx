import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/HeroCarousel.css";

const HeroCarousel = () => {
  const [spotlight, setSpotlight] = useState([]);
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.jikan.moe/v4/top/anime?filter=airing")
      .then(res => setSpotlight(res.data.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (spotlight.length) {
        setIndex(prev => (prev + 1) % spotlight.length);
        setAnimKey(prev => prev + 1);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [spotlight]);

  if (!spotlight.length) return null;

  const anime = spotlight[index];

  return (
    <div
      key={animKey}
      className="hero-carousel"
      style={{ backgroundImage: `url(${anime.images.jpg.large_image_url})` }}
    >
      <div className="hero-overlay">
        <span className="hero-spotlight">#{index + 1} Spotlight</span>
        <h1>{anime.title}</h1>
        <div className="hero-meta">
          <span>{anime.duration || "Unknown"}</span>
          <span>{anime.aired?.prop?.from?.year || "Unknown"}</span>
          <span className="quality-badge">HD</span>
          <span className="quality-badge">SUB</span>
        </div>
        <p>{anime.synopsis?.slice(0, 240)}...</p>

        {/* Updated button container */}
        <div className="hero-overlay-buttons">
          <button onClick={() => navigate(`/watch/${anime.mal_id}`)}>▶ Watch Now</button>
          <button onClick={() => navigate(`/anime/${anime.mal_id}`)}>Detail</button>
        </div>
      </div>
    </div>
  );
};

export default HeroCarousel;
