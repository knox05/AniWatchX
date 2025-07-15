import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/AnimeDetails.css";

const AnimeDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime/${id}`)
      .then((res) => setAnime(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);

  if (!anime) return <div className="loading">Loading...</div>;

  return (
    <div className="anime-details-page">
      <div className="details-header">
        {/* Left: Poster */}
        <div className="poster-section">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
            className="anime-poster"
          />
        </div>

        {/* Center: Info */}
        <div className="details-main">
          <h1 className="anime-title">{anime.title}</h1>

          <div className="details-tags">
            {anime.type && <span>{anime.type}</span>}
            {anime.status && <span>{anime.status}</span>}
            {anime.rating && <span>{anime.rating}</span>}
            {anime.duration && <span>{anime.duration}</span>}
          </div>

          <div className="genres">
            {anime.genres.map((g) => (
              <span key={g.mal_id} className="genre-badge">
                {g.name}
              </span>
            ))}
          </div>

          <div className="details-buttons">
            <button
              onClick={() => navigate(`/watch/${anime.mal_id}`)}
              className="watch-btn"
            >
              ▶ Watch Now
            </button>
            <button className="trailer-btn">🎬 Trailer</button>
          </div>

          <p className="synopsis-text">{anime.synopsis}</p>
        </div>

        {/* Right: Sidebar */}
        <div className="details-sidebar">
          <ul>
            <li>
              <strong>English Title:</strong> {anime.title_english || "N/A"}
            </li>
            <li>
              <strong>Episodes:</strong> {anime.episodes || "N/A"}
            </li>
            <li>
              <strong>Score:</strong> {anime.score || "N/A"}
            </li>
            <li>
              <strong>Aired:</strong> {anime.aired.string}
            </li>
            <li>
              <strong>Studio:</strong> {anime.studios[0]?.name || "Unknown"}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
