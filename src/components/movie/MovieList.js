import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { fetcher } from "../../config";
import MovieCard from "./MovieCard";
import { API_KEY } from "../../Constant";

const MovieList = ({ type = "now_playing" }) => {
  // const [movies, setMovies] = useState([]);
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/${type}?api_key=${API_KEY}`,
    fetcher
  );
  // useEffect(() => {
  //   if (data && data.results) setMovies(data.results);
  // }, [data]);
  const movies = data?.results || [];
  return (
    <div className="movie-list">
      <Swiper grabCursor="true" spaceBetween={40} slidesPerView="auto">
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
