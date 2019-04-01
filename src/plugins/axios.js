import axios from "axios";

export const HTTP = axios.create({
  baseURL: "http://94.156.218.243:8080",
  headers: { "Content-type": "application/json; charset=UTF-8" }
});
