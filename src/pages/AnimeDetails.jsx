import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/AnimeDetails.css";

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    axios.get(`https://api.jikan.moe/v4/anime/${id}`)
      .then(res => setAnime(res.data.data))
      .catch(err => console.log(err));
  }, [id]);

  if (!anime) return <div className="details-container">Loading...</div>;

  return (
    <div className="details-container">
      <div className="details-wrapper">
        <img className="details-image" src={anime.images.jpg.large_image_url} alt={anime.title} />
        <div className="details-content">
          <h1 className="details-title">{anime.title}</h1>
          <p className="details-description">{anime.synopsis || "No description available."}</p>
          <div className="details-info">
            <span>Rating: {anime.score || "N/A"}</span>
            <span>Episodes: {anime.episodes || "N/A"}</span>
            <span>Status: {anime.status}</span>
          </div>
        </div>
      </div>

      <div className="video-container">
        {anime.trailer.embed_url ? (
          <iframe src={anime.trailer.embed_url} allowFullScreen title="Trailer"></iframe>
        ) : (
          <p>No trailer available.</p>
        )}
      </div>
    </div>
  );
};

export default AnimeDetails;
