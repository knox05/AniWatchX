import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles/HeroCarousel.css";
import { useNavigate } from "react-router-dom";

const HeroCarousel = () => {
  const [spotlight, setSpotlight] = useState(null);
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/anime?filter=airing")
      .then(res => setSpotlight(res.data.data))
      .catch(err => console.log(err));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (spotlight) {
        setIndex((prev) => (prev + 1) % spotlight.length);
      }
    }, 5000); // 5 seconds auto slide

    return () => clearInterval(interval);
  }, [spotlight]);

  if (!spotlight) return null;

  const anime = spotlight[index];

  return (
    <div
      className="hero-carousel"
      style={{ backgroundImage: `url(${anime.images.jpg.large_image_url})` }}
    >
      <div className="hero-overlay">
        <h1>{anime.title}</h1>
        <p>{anime.genres.map(g => g.name).join(", ")}</p>
        <button onClick={() => navigate(`/watch/${anime.mal_id}`)}>Watch Now</button>
      </div>
    </div>
  );
};

export default HeroCarousel;
