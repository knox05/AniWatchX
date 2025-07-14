import React from "react";
import Slider from "react-slick";
import "../styles/Carousel.css";

const Carousel = ({ data, onItemClick }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 4 }
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 }
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 2 }
      }
    ]
  };

  return (
    <div className="carousel">
      <Slider {...settings}>
        {data.map(anime => (
          <div key={anime.mal_id} className="carousel-item" onClick={() => onItemClick(anime.mal_id)}>
            <img src={anime.images.jpg.large_image_url} alt={anime.title} />
            <p>{anime.title}</p>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
