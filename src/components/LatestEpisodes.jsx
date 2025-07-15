import React from "react";
import AnimeCard from "./AnimeCard";

const LatestEpisodes = ({ episodes }) => {
  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-4">📺 Latest Episode Releases</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {episodes.map((anime) => (
          <AnimeCard key={anime.mal_id} anime={anime} />
        ))}
      </div>
    </section>
  );
};

export default LatestEpisodes;
