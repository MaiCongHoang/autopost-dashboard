import axios from "axios";

export const http = axios.create({
  baseURL: "https://autopost-backend.onrender.com",
  timeout: 15000,
});
