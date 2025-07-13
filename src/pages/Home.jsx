import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const [animeList, setAnimeList] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("https://api.jikan.moe/v4/top/anime")
      .then(res => setAnimeList(res.data.data))
      .catch(err => console.log(err));
  }, []);

  const handleWatchNow = (id) => {
    navigate(`/watch/${id}`);
  };

  const filteredAnime = animeList.filter(anime => {
    const matchesSearch = anime.title.toLowerCase().includes(search.toLowerCase());
    const matchesGenre = genre === "All" || anime.genres.some(g => g.name === genre);
    return matchesSearch && matchesGenre;
  });

  return (
    <div className="home-container">
      <h1 className="heading">🔥 Trending Anime</h1>
      
      <div className="filters-container">
        <input
          type="text"
          placeholder="Search anime..."
          className="search-input"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        
        <select
          className="genre-select"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
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
        {filteredAnime.length > 0 ? (
          filteredAnime.map((anime) => (
            <div className="anime-card" key={anime.mal_id}>
              <img src={anime.images.jpg.large_image_url} alt={anime.title} />
              <h3>{anime.title}</h3>
              <button onClick={() => handleWatchNow(anime.mal_id)} className="watch-button">Watch Now</button>
            </div>
          ))
        ) : (
          <p style={{ textAlign: "center", marginTop: "50px", color: "#888" }}>
            No anime found!
          </p>
        )}
      </div>
    </div>
  );
};

export default Home;
