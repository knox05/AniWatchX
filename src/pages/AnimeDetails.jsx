import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import "../styles/AnimeDetails.css";

const AnimeDetails = () => {
  const { id } = useParams();
  const [anime, setAnime] = useState(null);

  useEffect(() => {
    const fetchAnimeDetails = async () => {
      try {
        const response = await axios.get(`https://api.jikan.moe/v4/anime/${id}`);
        setAnime(response.data.data);
      } catch (error) {
        console.error("Error fetching anime details:", error);
      }
    };

    fetchAnimeDetails();
  }, [id]);

  if (!anime) return <div className="loading">Loading...</div>;

  return (
    <div className="anime-details-page">
      <Navbar />
      <div className="anime-details">
        <img src={anime.images.jpg.large_image_url} alt={anime.title} />
        <div className="anime-info">
          <h2>{anime.title}</h2>
          <p>{anime.synopsis}</p>
          <p><strong>Episodes:</strong> {anime.episodes}</p>
          <p><strong>Score:</strong> {anime.score}</p>
          <p><strong>Status:</strong> {anime.status}</p>
          <p><strong>Genres:</strong> {anime.genres.map(g => g.name).join(", ")}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimeDetails;
