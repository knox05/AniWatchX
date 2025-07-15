import React from "react";
import AnimeCard from "./AnimeCard";

const MovieGrid = ({ movies }) => {
  return (
    <section className="my-10">
      <h2 className="text-2xl font-bold mb-4">🎬 Latest Movies</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {movies.map((movie) => (
          <AnimeCard key={movie.mal_id} anime={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieGrid;
