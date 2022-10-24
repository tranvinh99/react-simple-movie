import React from "react";
import { useParams } from "react-router-dom";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher, tmdbAPI } from "../../config";
import MovieCard from "./MovieCard";

function MovieSimilars() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieSimilar(movieId), fetcher);

  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <h2 className="text-3xl font-medium mb-10 text-primary">
        Similar movies
      </h2>
      <div className="movie-list">
        <Swiper grabCursor="true" spaceBetween={40} slidesPerView="auto">
          {results.length > 0 &&
            results.map((item) => (
              <SwiperSlide key={item.id}>
                <MovieCard item={item} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>
    </div>
  );
}

export default MovieSimilars;
