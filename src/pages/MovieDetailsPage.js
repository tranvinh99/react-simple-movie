import React from "react";
import { useParams } from "react-router-dom";
import useSWR from "swr";
import MovieSimilars from "../components/movie/MovieSimilars";
import { fetcher, tmdbAPI } from "../config";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieDetail(movieId), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, genres, overview } = data;
  return (
    <div className="pb-10">
      <div className="w-full h-[600px] relative mb-10 ">
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${tmdbAPI.imageOriginal(backdrop_path)})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 pb-10">
        <img
          src={tmdbAPI.imageOriginal(poster_path)}
          className="w-full h-full object-cover rounded-xl"
          alt=""
        />
      </div>
      <h1 className="text-center text-3xl font-bold text-white mb-10">
        {title}
      </h1>
      {genres.length > 0 && (
        <div className="flex items-center gap-x-5 mb-10 justify-center font-bold text-xl text-primary">
          {genres.map((item) => (
            <span
              className="py-2 px-4 border-primary border rounded-lg"
              key={item.id}
            >
              {item.name}
            </span>
          ))}
        </div>
      )}
      <p className="text-center text-xl leading-relaxed max-w-[600px] mx-auto text-white mb-10">
        {overview}
      </p>
      <MovieCredits />
      <MovieVideos />
      <MovieSimilars />
    </div>
  );
};
function MovieCredits() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "credits"), fetcher);

  if (!data) return null;
  const { cast } = data;
  if (!cast || cast.length <= 0) return null;

  return (
    <div className="py-10 mb-10">
      <h2 className="text-center text-3xl mb-10 text-white">Casts</h2>
      <div className="grid grid-cols-4 gap-5 text-white">
        {cast.splice(0, 4).map((item) => (
          <div key={item.id} className="cast-item">
            <img
              src={tmdbAPI.imageOriginal(item.profile_path)}
              className="w-full h-[350px] object-cover rounded-lg mb-3"
              alt={item.name}
            />
            <h3 className="text-xl font-medium">{item.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}
function MovieVideos() {
  const { movieId } = useParams();
  const { data } = useSWR(tmdbAPI.getMovieMeta(movieId, "videos"), fetcher);

  if (!data) return null;
  const { results } = data;
  if (!results || results.length <= 0) return null;
  return (
    <div className="py-10">
      <div className="flex flex-col gap-10">
        {results.map((item) => (
          <div className="" key={item.id}>
            <h3 className="mb-5 text-3xl font-medium text-primary text-center">
              {item.name}
            </h3>
            <div className="w-full aspect-video">
              <iframe
                width="1280"
                height="720"
                src={tmdbAPI.youtubeSrc(item.key)}
                title={item.name}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full object-fill"
              ></iframe>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MovieDetailsPage;
