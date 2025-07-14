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
    <div className="watch-page">
      <div className="video-container">
        <iframe
          src={`https://vidsrc.to/embed/tv/${id}`}
          frameBorder="0"
          allowFullScreen
          title="Anime Video"
        ></iframe>
      </div>

      <div className="anime-details">
        <img src={anime.images.jpg.large_image_url} alt={anime.title} />
        <div className="info">
          <h2>{anime.title}</h2>
          <p><strong>Episodes:</strong> {anime.episodes}</p>
          <p><strong>Score:</strong> {anime.score}</p>
          <p><strong>Status:</strong> {anime.status}</p>
          <p><strong>Genres:</strong> {anime.genres.map(g => g.name).join(", ")}</p>
          <p>{anime.synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default WatchPage;
