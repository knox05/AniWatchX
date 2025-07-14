import { Link } from "react-router-dom";
import "./AnimeCard.css";

const AnimeCard = ({ anime }) => {
  return (
    <Link to={`/anime/${anime.mal_id}`} className="anime-card-link">
      <div className="anime-card">
        <img
          src={anime.images.jpg.image_url}
          alt={anime.title}
          className="anime-card-image"
        />
        <div className="anime-card-title">
          {anime.title}
        </div>
      </div>
    </Link>
  );
};

export default AnimeCard;
