import axios from "axios";
import type { Movie } from "../types/movie";

const API_URL = "https://api.themoviedb.org/3/search/movie";
const TOKEN = import.meta.env.VITE_TMDB_TOKEN; 

export async function fetchMovies(query: string): Promise<Movie[]> {
  const response = await axios.get(API_URL, {
    params: { query, include_adult: false, language: "en-US" },
    headers: {
      Authorization: `Bearer ${TOKEN}`,
    },
  });

  return response.data.results as Movie[];
}
