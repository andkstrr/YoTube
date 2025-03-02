import axios from "axios";
export const URL = import.meta.env.VITE_YOUTUBE_API_URL;

export const API = axios.create({
  baseURL: URL,
});
