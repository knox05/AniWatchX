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

  const filteredAnime = animeList.filter(anime =>
    anime.title.toLowerCase().includes(search.toLowerCase()) &&
    (genre === "All" || anime.genres.some(g => g.name === genre))
  );

  return (
    <main className="home-container">
      <HeroCarousel />

      <div className="filters-container">
        <input
          type="text"
          placeholder="Search anime..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="search-input"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="genre-select"
        >
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          <option value="Romance">Romance</option>
          <option value="Drama">Drama</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Horror">Horror</option>
          <option value="Supernatural">Supernatural</option>
        </select>
      </div>

      <div className="main-grid">
        <div className="content-column">
          <h2 className="section-title">🔥 Trending Anime</h2>
          <section className="anime-grid">
            {filteredAnime.map(anime => (
              <div className="anime-card" key={anime.mal_id}>
                <div
                  className="image-wrapper"
                  onClick={() => navigate(`/anime/${anime.mal_id}`)}
                  style={{ cursor: 'pointer' }}
                >
                  <img
                    src={anime.images.jpg.large_image_url}
                    alt={anime.title}
                    loading="lazy"
                  />
                </div>
                <h3>{anime.title}</h3>
                <button
                  onClick={() => navigate(`/anime/${anime.mal_id}`)}
                  className="watch-button"
                >
                  Watch Now
                </button>
              </div>
            ))}
          </section>
        </div>

        {/* Top 10 Styled Section */}
        <aside className="sidebar styled-top10">
          <h2>Top 10 This Week</h2>
          <ul className="top10-cards">
            {topAiring.slice(0, 10).map((anime, i) => (
              <li
                key={anime.mal_id}
                className="top10-card"
                onClick={() => navigate(`/anime/${anime.mal_id}`)}
              >
                <span className="rank">{i + 1}</span>
                <img
                  src={anime.images.jpg.image_url}
                  alt={anime.title}
                  className="top10-thumbnail"
                />
                <div className="top10-info">
                  <div className="top10-title">{anime.title}</div>
                  <div className="top10-score">⭐ {anime.score ?? "N/A"}</div>
                </div>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </main>
  );
};

export default Home;
