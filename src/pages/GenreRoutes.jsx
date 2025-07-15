import React from "react";
import GenrePage from "./GenrePage";

const genreMap = {
  Action: 1,
  Comedy: 4,
  Romance: 22,
  Fantasy: 10,
};

const GenreRoutes = ({ genreName }) => {
  const genreId = genreMap[genreName];
  return <GenrePage genre={genreId} />;
};

export default GenreRoutes;
