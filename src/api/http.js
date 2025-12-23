import axios from "axios";

export const http = axios.create({
  baseURL: "https://autopost-backend-r60y.onrender.com",
  timeout: 15000,
});
