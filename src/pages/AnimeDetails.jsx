import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/AnimeDetails.css";

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`https://api.jikan.moe/v4/anime/${id}`)
      .then(res => {
        setAnime(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!anime) {
    return <div className="loading">Anime not found</div>;
  }

  return (
    <div className="anime-details-page">
      <div className="anime-details-container">
        <img
          src={anime.images.jpg.large_image_url}
          alt={anime.title}
          className="anime-details-image"
        />

        <div className="anime-info">
          <h1>{anime.title}</h1>
          <p><strong>Episodes:</strong> {anime.episodes || "N/A"}</p>
          <p><strong>Status:</strong> {anime.status}</p>
          <p><strong>Rating:</strong> {anime.rating || "N/A"}</p>
          <p><strong>Genres:</strong> {anime.genres.map(g => g.name).join(", ")}</p>
          <p className="anime-synopsis">{anime.synopsis || "No synopsis available."}</p>

          <div className="video-container">
            {anime.trailer?.embed_url ? (
              <iframe
                src={anime.trailer.embed_url}
                title="Anime Trailer"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            ) : (
              <p className="no-trailer">Trailer not available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
