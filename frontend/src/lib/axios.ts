import axios from "axios";

const SERVER_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const api = axios.create({
  baseURL: SERVER_URL,
  withCredentials: true,
});
