import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import "../styles/Home.css";

const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const [topAiring, setTopAiring] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/anime")
      .then(res => setAnimeList(res.data.data))
      .catch(err => console.error(err));

    axios.get("https://api.jikan.moe/v4/top/anime?filter=airing")
      .then(res => setTopAiring(res.data.data))
      .catch(err => console.error(err));
  }, []);

  const handleWatchNow = (id) => {
    navigate(`/anime/${id}`);
  };

  const filteredAnime = animeList.filter(anime =>
    anime.title.toLowerCase().includes(search.toLowerCase()) &&
    (genre === "All" || anime.genres.some(g => g.name === genre))
  );

  return (
    <main className="home-container">
      <HeroCarousel animeList={topAiring} />

      <section className="filters-container">
        <input
          type="text"
          placeholder="Search anime..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
          aria-label="Search anime"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="genre-select"
          aria-label="Filter by genre"
        >
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Romance">Romance</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Supernatural">Supernatural</option>
          <option value="Horror">Horror</option>
          <option value="Thriller">Thriller</option>
        </select>
      </section>

      <h2 className="trending-heading">🔥 Trending Anime</h2>

      <section className="anime-grid">
        {filteredAnime.map(anime => (
          <div className="anime-card" key={anime.mal_id}>
            <div className="image-wrapper">
              <img
                src={anime.images.jpg.large_image_url}
                alt={anime.title}
                loading="lazy"
              />
            </div>
            <h3>{anime.title}</h3>
            <button
              onClick={() => handleWatchNow(anime.mal_id)}
              className="watch-button"
            >
              Watch Now
            </button>
          </div>
        ))}
      </section>
    </main>
  );
};

export default Home;
