import axios from "axios";

// Set config defaults when creating the instance
export const base = axios.create({
  baseURL: "http://localhost:9000",
});
