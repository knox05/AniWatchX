import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/GenrePage.css";

const GenrePage = ({ genre }) => {
  const [animeList, setAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGenreAnime = async () => {
      try {
        const res = await fetch(`https://api.jikan.moe/v4/anime?genres=${genre}&order_by=popularity&limit=24`);
        const data = await res.json();
        setAnimeList(data.data);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch genre anime:", err);
        setLoading(false);
      }
    };

    fetchGenreAnime();
  }, [genre]);

  return (
    <div className="genre-page">
      <h2 className="genre-title">{genre} Anime</h2>

      {loading ? (
        <div className="loading">Loading...</div>
      ) : (
        <div className="genre-grid">
          {animeList.map(anime => (
            <Link key={anime.mal_id} to={`/anime/${anime.mal_id}`} className="genre-card">
              <img src={anime.images.jpg.image_url} alt={anime.title} />
              <p>{anime.title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default GenrePage;
