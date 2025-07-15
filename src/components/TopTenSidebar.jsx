import React from "react";
import { Link } from "react-router-dom";

const TopTenSidebar = ({ animeList }) => {
  const top10 = animeList.slice(0, 10);

  return (
    <aside className="bg-gray-800 p-4 rounded-lg w-full lg:w-1/4">
      <h2 className="text-xl font-semibold mb-4">📈 Top 10 Rankings</h2>
      <ol className="space-y-3 list-decimal list-inside">
        {top10.map((anime, i) => (
          <li key={anime.mal_id} className="text-sm">
            <Link to={`/anime/${anime.mal_id}`} className="text-blue-400 hover:underline">
              {anime.title}
            </Link>
          </li>
        ))}
      </ol>
    </aside>
  );
};

export default TopTenSidebar;
