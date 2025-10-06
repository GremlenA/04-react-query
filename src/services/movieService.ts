import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
interface MovieResponse {
  results: Movie[];
  total_pages: number;
}

export async function fetchMovies(query: string, page = 1): Promise<{
  results: Movie[];
  totalPages: number
}> {
  const response = await axios.get<MovieResponse>(API_URL, {
    params: {
      query,
      page,
      include_adult: false,
      language: "en-US",
    },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return {
    results: response.data.results,
    totalPages: response.data.total_pages,
  };
}
