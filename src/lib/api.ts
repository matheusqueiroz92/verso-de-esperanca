import axios from "axios";

const API_KEY = "af8b25f22a16a3b76ad6744bff1e8950"; // Substitua pela sua chave real
export const BIBLE_ID = "d63894c8d9a7a503-01";

export const api = axios.create({
  baseURL: "https://api.scripture.api.bible/v1",
  headers: {
    "api-key": API_KEY,
    accept: "application/json",
  },
});
