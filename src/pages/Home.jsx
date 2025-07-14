import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import Carousel from "../components/Carousel";

const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const [topAiring, setTopAiring] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/anime")
      .then(res => setAnimeList(res.data.data))
      .catch(err => console.log(err));

    axios.get("https://api.jikan.moe/v4/top/anime?type=tv&filter=airing")
      .then(res => setTopAiring(res.data.data))
      .catch(err => console.log(err));
  }, []);

  const handleWatchNow = (id) => {
    navigate(`/watch/${id}`);
  };

  const filteredAnime = animeList.filter(anime =>
    anime.title.toLowerCase().includes(search.toLowerCase()) &&
    (genre === "All" || anime.genres.some(g => g.name === genre))
  );

  return (
    <div className="home-container">
      <h1 className="heading">🔥 Trending Anime</h1>

      {topAiring.length === 0 ? (
        <p className="no-data">No top airing anime found.</p>
      ) : (
        <Carousel data={topAiring} onItemClick={handleWatchNow} />
      )}

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
          <option>All</option>
          <option>Action</option>
          <option>Comedy</option>
          <option>Romance</option>
          <option>Drama</option>
          <option>Fantasy</option>
          <option>Supernatural</option>
          <option>Horror</option>
          <option>Thriller</option>
        </select>
      </div>

      <div className="anime-grid">
        {filteredAnime.map(anime => (
          <div className="anime-card" key={anime.mal_id}>
            <div className="image-wrapper">
              <img src={anime.images.jpg.large_image_url} alt={anime.title} />
            </div>
            <h3>{anime.title}</h3>
            <button onClick={() => handleWatchNow(anime.mal_id)} className="watch-button">
              Watch Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
