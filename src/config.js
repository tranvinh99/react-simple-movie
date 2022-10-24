export const fetcher = (...args) => fetch(...args).then((res) => res.json());
const API_KEY = "bc1bf4daf033c91ef147d7f9e60f5d86";
const LANGUAGE = "language=en-US";
const tmdbEndpoint = "https://api.themoviedb.org/3/movie";
const tmdbImgEndPoint = "https://image.tmdb.org/t/p";
export const tmdbAPI = {
  getMovieList: (type) => `${tmdbEndpoint}/${type}?api_key=${API_KEY}`,
  getMovieList2: () =>
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&${LANGUAGE}`,
  getMovieDetail: (id) => `${tmdbEndpoint}/${id}?api_key=${API_KEY}`,
  getMovieMeta: (id, type) =>
    `${tmdbEndpoint}/${id}/${type}?api_key=${API_KEY}`,
  getMovieSimilar: (id) =>
    `${tmdbEndpoint}/${id}/similar?api_key=${API_KEY}&${LANGUAGE}`,
  image500w: (url) => `${tmdbImgEndPoint}/w500/${url}`,
  imageOriginal: (url) => `${tmdbImgEndPoint}/original/${url}`,
  youtubeSrc: (url) => `https://www.youtube.com/embed/${url}`,
  pageSetup: (page, type) =>
    `${tmdbEndpoint}/${type}?api_key=${API_KEY}&${LANGUAGE}&page=${page}`,
  nextPage: (query, page) =>
    `${tmdbEndpoint}?api_key=${API_KEY}&${LANGUAGE}&query=${query}&page=${page}`,
};
