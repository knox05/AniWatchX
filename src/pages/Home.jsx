import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import HeroCarousel from "../components/HeroCarousel";
import "../styles/Home.css";

const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const [topAiring, setTopAiring] = useState([]);
  const [latestEpisodes, setLatestEpisodes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAnimeList(page);
    fetchTopAiring();
    fetchLatestEpisodes();
    fetchLatestMovies();
  }, [page]);

  const fetchAnimeList = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://api.jikan.moe/v4/anime?page=${page}`);
      setAnimeList(res.data.data);
      setLastPage(res.data.pagination.last_visible_page);
    } catch (error) {
      console.error("Error fetching anime list:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTopAiring = async () => {
  try {
    const res = await axios.get("https://api.jikan.moe/v4/top/anime?filter=airing&limit=10");
    setTopAiring(res.data.data || []);
  } catch (error) {
    console.error("Error fetching top airing anime:", error);
    setTopAiring([]); // fallback
  }
};


  const fetchLatestEpisodes = async () => {
    try {
      const res = await axios.get("https://api.jikan.moe/v4/watch/episodes");
      setLatestEpisodes(res.data.data.slice(0, 12));
    } catch (error) {
      console.error("Error fetching latest episodes:", error);
    }
  };

  const fetchLatestMovies = async () => {
    try {
      const res = await axios.get(
        "https://api.jikan.moe/v4/anime?type=movie&order_by=start_date&sort=desc&limit=10"
      );
      setMovies(res.data.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const filteredAnime = animeList.filter(
    (anime) =>
      anime.title.toLowerCase().includes(search.toLowerCase()) &&
      (genre === "All" || anime.genres.some((g) => g.name === genre))
  );

  return (
    <main className="home-container">
      <HeroCarousel />

      {/* Filters */}
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
          {/* 🔥 Trending Anime */}
          <h2 className="section-title">🔥 Trending Anime</h2>
          {loading ? (
            <div className="loading">Loading...</div>
          ) : (
            <section className="anime-grid">
              {filteredAnime.map((anime) => (
                <div className="anime-card" key={anime.mal_id}>
                  <div
                    className="image-wrapper"
                    onClick={() => navigate(`/anime/${anime.mal_id}`)}
                  >
                    <img
                      src={anime.images?.jpg?.large_image_url}
                      alt={anime.title}
                      loading="lazy"
                      onError={(e) =>
                        (e.target.src = "https://via.placeholder.com/150x200?text=No+Image")
                      }
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
          )}

          {/* Pagination */}
          <div className="pagination-controls">
            <button onClick={() => setPage((p) => Math.max(p - 1, 1))} disabled={page === 1}>
              ← Previous
            </button>
            <span>
              Page {page} of {lastPage}
            </span>
            <button
              onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
              disabled={page === lastPage}
            >
              Next →
            </button>
          </div>

          {/* 🆕 Latest Episodes */}
          <h2 className="section-title">🆕 Latest Episodes</h2>
          <section className="episodes-grid">
            {latestEpisodes.map((item) => (
              <div className="anime-card" key={item.entry.mal_id}>
                <div
                  className="image-wrapper"
                  onClick={() => navigate(`/anime/${item.entry.mal_id}`)}
                >
                  <img
                    src={item.entry.images?.jpg?.large_image_url}
                    alt={item.entry.title}
                    loading="lazy"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150x200?text=No+Image")
                    }
                  />
                </div>
                <h3>{item.entry.title}</h3>
                <button
                  onClick={() => navigate(`/anime/${item.entry.mal_id}`)}
                  className="watch-button"
                >
                  EP {item.episodes?.[0]?.mal_id ?? "?"}
                </button>
              </div>
            ))}
          </section>

          {/* 🎬 Latest Movies */}
          <h2 className="section-title">🎬 Latest Movies</h2>
          <section className="movie-grid">
            {movies.map((movie) => (
              <div className="anime-card" key={movie.mal_id}>
                <div
                  className="image-wrapper"
                  onClick={() => navigate(`/anime/${movie.mal_id}`)}
                >
                  <img
                    src={movie.images?.jpg?.large_image_url}
                    alt={movie.title}
                    loading="lazy"
                    onError={(e) =>
                      (e.target.src = "https://via.placeholder.com/150x200?text=No+Image")
                    }
                  />
                </div>
                <h3>{movie.title}</h3>
                <button
                  onClick={() => navigate(`/anime/${movie.mal_id}`)}
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
            {topAiring.length === 0 ? (
              <p style={{ color: '#888', fontSize: '0.9rem' }}>No top airing anime available.</p>
            ) : (
              topAiring.slice(0, 10).map((anime, i) => (
                <li
                  key={anime.mal_id}
                  className="top10-card"
                  onClick={() => navigate(`/anime/${anime.mal_id}`)}
                >
                  <span className="rank">{i + 1}</span>
                  <img
                    src={anime.images.jpg.image_url || anime.images.jpg.large_image_url}
                    alt={anime.title}
                    className="top10-thumbnail"
                  />
                  <div className="top10-info">
                    <div className="top10-title">{anime.title}</div>
                    <div className="top10-score">⭐ {anime.score ?? "N/A"}</div>
                  </div>
                </li>
              ))
            )}
          </ul>

        </aside>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <p>&copy; {new Date().getFullYear()} AniStream • Built for anime lovers.</p>
          <p>All data provided by Jikan API. We do not host or stream any content.</p>
        </div>
      </footer>
    </main>
  );
};

export default Home;
