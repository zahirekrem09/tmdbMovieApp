/* eslint-disable prettier/prettier */
const base_url = 'https://api.themoviedb.org/3/';
const api_key = '3488df73f1d5f6c1480437e6ce92b833';
const search_url = 'https://api.themoviedb.org/3/search/';
const genres_data = {
  12: 'Adventure',
  14: 'Fantasy',
  16: 'Animation',
  18: 'Drama',
  27: 'Horror',
  28: 'Action',
  35: 'Comedy',
  36: 'History',
  37: 'Western',
  53: 'Thriller',
  80: 'Crime',
  99: 'Documentary',
  878: 'Science Fiction',
  9648: 'Mystery',
  10402: 'Music',
  10749: 'Romance',
  10751: 'Family',
  10752: 'War',
  10770: 'TV Movie',
  10759: 'Action & Adventure',
  10762: 'Kids',
  10763: 'News',
  10765: 'Sci-Fi & Fantasy',
  10764: 'Reality',
  10766: 'Soap',
  10767: 'Talk',
  10768: 'War & Politics',
};
const getImagePath = (path) =>
  `https://image.tmdb.org/t/p/w440_and_h660_face${path}`;
const getBackdropPath = (path) =>
  `https://image.tmdb.org/t/p/w370_and_h556_multi_faces${path}`;
export const getMovies = async (category, type, page) => {
  let API_URL = `${base_url}${category}/${type}?api_key=${api_key}&language=en-US&page=${page}`;
  const {results} = await fetch(API_URL).then((res) => res.json());
  const movies = results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map((genre) => genres_data[genre]),
    }),
  );

  return movies;
};

export const getTVShows = async (category, type, page) => {
  let API_URL = `${base_url}${category}/${type}?api_key=${api_key}&language=en-US&page=${page}`;
  const {results} = await fetch(API_URL).then((res) => res.json());
  const tvShows = results.map(
    ({
      id,
      original_name,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      first_air_date,
      genre_ids,
    }) => ({
      key: String(id),
      title: original_name,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: first_air_date,
      genres: genre_ids.map((genre) => genres_data[genre]),
    }),
  );

  return tvShows;
};
export const getDetail = async (category, movie_id) => {
  let API_URL = `${base_url}${category}/${movie_id}?api_key=${api_key}&language=en-US`;
  const result = await fetch(API_URL).then((res) => res.json());
  return result;
};

export const getCast = async (category, movie_id) => {
  let API_URL = `${base_url}${category}/${movie_id}/credits?api_key=${api_key}`;
  const {cast} = await fetch(API_URL).then((res) => res.json());
  const result = cast.map(({id, original_name, profile_path, character}) => ({
    key: String(id),
    name: original_name,
    poster:
      profile_path !== null
        ? getImagePath(profile_path)
        : 'https://cdn4.vectorstock.com/i/thumb-large/06/18/male-avatar-profile-picture-vector-10210618.jpg',
    character,
  }));
  return result;
};

export const getCrew = async (category, movie_id) => {
  let API_URL = `${base_url}${category}/${movie_id}/credits?api_key=${api_key}`;
  const {crew} = await fetch(API_URL).then((res) => res.json());
  const result = crew.map(({id, original_name, profile_path, job}) => ({
    key: String(id),
    name: original_name,
    poster:
      profile_path !== null
        ? getImagePath(profile_path)
        : 'https://cdn4.vectorstock.com/i/thumb-large/06/18/male-avatar-profile-picture-vector-10210618.jpg',
    character: job,
  }));

  const rcrew = result.filter(
    (a) =>
      a.character == 'Story' ||
      a.character == 'Director' ||
      a.character == 'Executive Producer' ||
      a.character == 'Novel' ||
      a.character == 'Producer',
  );

  return rcrew;
};
export const getSimilarMovies = async (category, movie_id) => {
  let API_URL = `${base_url}${category}/${movie_id}/similar?api_key=${api_key}&language=en-US&page=1`;
  const {results} = await fetch(API_URL).then((res) => res.json());
  const movies = results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map((genre) => genres_data[genre]),
    }),
  );

  return movies;
};

export const getSimilarTvs = async (category, movie_id) => {
  let API_URL = `${base_url}${category}/${movie_id}/similar?api_key=${api_key}&language=en-US&page=1`;
  const {results} = await fetch(API_URL).then((res) => res.json());
  const tvs = results.map(
    ({
      id,
      original_name,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      first_air_date,
      genre_ids,
    }) => ({
      key: String(id),
      title: original_name,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: first_air_date,
      genres: genre_ids.map((genre) => genres_data[genre]),
    }),
  );

  return tvs;
};
export const getVideos = async (category, movie_id) => {
  let API_URL = `${base_url}${category}/${movie_id}/videos?api_key=${api_key}&language=en-US`;
  const {results} = await fetch(API_URL).then((res) => res.json());

  return results;
};

export const getSearchMovies = async (query, page) => {
  let API_URL = `${search_url}movie?api_key=${api_key}&language=en-US&query=${query}&page=${page}&include_adult=false`;
  const {results, total_results, total_pages} = await fetch(
    API_URL,
  ).then((res) => res.json());
  const movies = results.map(
    ({
      id,
      original_title,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    }) => ({
      key: String(id),
      title: original_title,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: release_date,
      genres: genre_ids.map((genre) => genres_data[genre]),
    }),
  );
  const data = {
    movies: movies,
    total_results: total_results,
    total_pages: total_pages,
  };
  return data;
};
export const getSearchTVShows = async (query, page) => {
  let API_URL = `${search_url}tv?api_key=${api_key}&language=en-US&query=${query}&page=${page}&include_adult=false`;
  const {results, total_results, total_pages} = await fetch(
    API_URL,
  ).then((res) => res.json());
  const tvShows = results?.map(
    ({
      id,
      original_name,
      poster_path,
      backdrop_path,
      vote_average,
      overview,
      first_air_date,
      genre_ids,
    }) => ({
      key: String(id),
      title: original_name,
      poster: getImagePath(poster_path),
      backdrop: getBackdropPath(backdrop_path),
      rating: vote_average,
      description: overview,
      releaseDate: first_air_date,
      genres: genre_ids.map((genre) => genres_data[genre]),
    }),
  );
  const data = {
    tvShows: tvShows,
    total_results: total_results,
    total_pages: total_pages,
  };
  return data;
};
// https://api.themoviedb.org/3/search/movie?api_key=3488df73f1d5f6c1480437e6ce92b833&language=en-US&query=dark&page=1&include_adult=false  getSearchTVShows
// https://api.themoviedb.org/3/movie/{movie_id}/similar?api_key=3488df73f1d5f6c1480437e6ce92b833&language=en-US&page=1
// https://api.themoviedb.org/3/movie/top_rated?api_key=3488df73f1d5f6c1480437e6ce92b833&language=en-US&page=1
// https://api.themoviedb.org/3/tv/popular?api_key=3488df73f1d5f6c1480437e6ce92b833&language=en-US&page=1
// https://api.themoviedb.org/3/search/movie?api_key=3488df73f1d5f6c1480437e6ce92b833&language=en-US&query=batman&page=1&include_adult=false
// https://api.themoviedb.org/3/movie/400160/credits?api_key=3488df73f1d5f6c1480437e6ce92b833
// https://api.themoviedb.org/3/search/multi?api_key=3488df73f1d5f6c1480437e6ce92b833&language=en-US&query=batman&page=1&include_adult=false
// https://api.themoviedb.org/3/movie/724089?api_key=3488df73f1d5f6c1480437e6ce92b833&language=en-US

// https://api.themoviedb.org/3/trending/movie/day?api_key=3488df73f1d5f6c1480437e6ce92b833   all,movie,tv  day week

// const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc`;

// https://www.youtube.com/watch?v=fYlZDTru55g
// https://api.themoviedb.org/3/movie/724989/videos?api_key=3488df73f1d5f6c1480437e6ce92b833&language=en-US
// https://api.themoviedb.org/3/tv/71712/videos?api_key=3488df73f1d5f6c1480437e6ce92b833&language=en-US

// {
//   "id": 724989,
//   "results": [
//     {
//       "id": "5f10c20a2495ab0032397958",
//       "iso_639_1": "en",
//       "iso_3166_1": "US",
//       "key": "7Y6-w5Psupw",
//       "name": "Hard Kill | Official Trailer (HD) | Vertical Entertainment",
//       "site": "YouTube",
//       "size": 1080,
//       "type": "Trailer"
//     }
//   ]
// }
