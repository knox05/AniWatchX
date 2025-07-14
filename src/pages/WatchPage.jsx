import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/WatchPage.css";

const WatchPage = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    axios.get(`https://api.jikan.moe/v4/anime/${id}`)
      .then(res => setAnime(res.data.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!anime) return <div className="loading">Loading...</div>;

  return (
    <div className="watch-container">
      <div className="video-wrapper">
        <iframe
          src={`https://vidsrc.to/embed/tv/${id}`}
          title="Anime Video"
          allowFullScreen
        ></iframe>
      </div>

      <div className="anime-meta">
        <img src={anime.images.jpg.large_image_url} alt={anime.title} className="poster" />

        <div className="details">
          <h1>{anime.title}</h1>
          <div className="stats">
            <p><strong>Episodes:</strong> {anime.episodes || "N/A"}</p>
            <p><strong>Score:</strong> {anime.score || "N/A"}</p>
            <p><strong>Status:</strong> {anime.status}</p>
            <p><strong>Type:</strong> {anime.type}</p>
            <p><strong>Aired:</strong> {anime.aired.string}</p>
            <p><strong>Duration:</strong> {anime.duration}</p>
          </div>

          <div className="genres">
            {anime.genres.map(g => (
              <span key={g.mal_id} className="genre">{g.name}</span>
            ))}
          </div>

          <div className="synopsis">
            <h3>Synopsis</h3>
            <p>{anime.synopsis}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
