import { Link } from "react-router-dom";

const AnimeCard = ({ anime }) => {
  return (
    <Link to={`/anime/${anime.mal_id}`} className="bg-gray-800 rounded-xl overflow-hidden shadow hover:scale-105 transition">
      <img
        src={anime.images.jpg.image_url}
        alt={anime.title}
        className="w-full h-60 object-cover"
      />
      <div className="p-3">
        <h3 className="text-sm font-semibold text-white line-clamp-2">{anime.title}</h3>
      </div>
    </Link>
  );
};

export default AnimeCard;
