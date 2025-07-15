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
    <div className="anime-details-wrapper">
      <div className="anime-details-container">
        <div className="anime-image">
          <img
            src={anime.images.jpg.large_image_url}
            alt={anime.title}
          />
        </div>

        <div className="anime-content">
          <h1>{anime.title}</h1>

          <div className="anime-info">
            <p><strong>Episodes:</strong> {anime.episodes || "N/A"}</p>
            <p><strong>Score:</strong> {anime.score || "N/A"}</p>
            <p><strong>Status:</strong> {anime.status}</p>
            <p><strong>Type:</strong> {anime.type}</p>
            <p><strong>Aired:</strong> {anime.aired.string}</p>
            <p><strong>Duration:</strong> {anime.duration}</p>
          </div>

          <div className="genres">
            {anime.genres.map((g) => (
              <span key={g.mal_id} className="genre-badge">{g.name}</span>
            ))}
          </div>

          <button
            className="watch-now-btn"
            onClick={() => navigate(`/watch/${anime.mal_id}-ep1`)}
          >
            ▶️ Watch Now
          </button>
        </div>
      </div>

      <div className="anime-synopsis">
        <h2>Synopsis</h2>
        <p>{anime.synopsis}</p>
      </div>
    </div>
  );
};

export default AnimeDetails;
