import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/WatchPage.css";

const WatchPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    axios
      .get(`https://api.jikan.moe/v4/anime/${id}`)
      .then((res) => setAnime(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);

  useEffect(() => {
    if (anime) {
      axios
        .get("https://api.jikan.moe/v4/anime?limit=24")
        .then((res) => {
          const filtered = res.data.data.filter(
            (a) =>
              a.mal_id !== anime.mal_id &&
              a.genres.some((g) => anime.genres.map((ag) => ag.name).includes(g.name))
          );
          setRecommendations(filtered.slice(0, 12));
        })
        .catch((err) => console.log(err));
    }
  }, [anime]);

  if (!anime) return <div className="loading">Loading...</div>;

  return (
    <div className="watch-page">
      <div className="watch-hero">
        <div className="hero-left">
          <img src={anime.images.jpg.large_image_url} alt={anime.title} className="hero-poster" />
        </div>

        <div className="hero-center">
          <h1 className="hero-title">{anime.title}</h1>
          <div className="hero-tags">
            {anime.type && <span>{anime.type}</span>}
            {anime.rating && <span>{anime.rating}</span>}
            {anime.duration && <span>{anime.duration}</span>}
            {anime.status && <span>{anime.status}</span>}
          </div>

          <div className="hero-buttons">
            <button className="btn btn-primary">▶ Watch Now</button>
            <button className="btn btn-secondary">＋ Add to List</button>
            <button className="btn btn-secondary">🎞 Watch Trailer</button>
          </div>

          <p className="hero-description">{anime.synopsis}</p>

          <div className="share-buttons">
            <span>Share:</span>
            <button className="social">Telegram</button>
            <button className="social">Reddit</button>
            <button className="social">Facebook</button>
            <button className="social">WhatsApp</button>
          </div>
        </div>

        <div className="hero-right">
          <ul>
            <li><strong>Title:</strong> {anime.title_english || anime.title}</li>
            <li><strong>Episodes:</strong> {anime.episodes || "N/A"}</li>
            <li><strong>Score:</strong> {anime.score || "N/A"}</li>
            <li><strong>Status:</strong> {anime.status}</li>
            <li><strong>Type:</strong> {anime.type}</li>
            <li><strong>Duration:</strong> {anime.duration}</li>
            <li><strong>Genres:</strong> {anime.genres.map((g) => g.name).join(", ")}</li>
            <li><strong>Studio:</strong> {anime.studios[0]?.name || "Unknown"}</li>
          </ul>
        </div>
      </div>

      <div className="video-wrapper">
        <iframe
          src={`https://vidsrc.to/embed/tv/${id}`}
          title="Anime Video"
          allowFullScreen
        ></iframe>
      </div>

      <div className="episodes-section">
        <h2>Episodes</h2>
        <p>Episodes list will be shown here.</p>
      </div>

      <div className="recommended-section">
        <h2>Recommended For You</h2>
        <div className="recommended-grid">
          {recommendations.map((rec) => (
            <div className="recommended-card" key={rec.mal_id}>
              <img src={rec.images.jpg.image_url} alt={rec.title} />
              <p>{rec.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchPage;