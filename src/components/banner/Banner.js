import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import { SwiperSlide, Swiper } from "swiper/react";
import BannerItem from "./BannerItem";
import { API_KEY } from "../../Constant";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`,
    fetcher
  );
  const movies = data?.results || [];
  const [genres, setGenres] = useState([]);
  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) setGenres(data.genres);
      });
  }, []);

  return (
    <section className="banner h-[500px] page-container mb-20 overflow-hidden">
      <Swiper className="h-full" grabCursor="true" slidesPerView="auto">
        {movies.length > 0 &&
          movies.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item} />
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Banner;
