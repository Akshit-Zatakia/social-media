import axios from "axios";

const baseURL = "http://localhost:8081/api/";
const prodURL = "https://social-media-0.herokuapp.com/api/";

const instance = axios.create({
  baseURL: prodURL,
  headers: {
    "Content-type": "application/json",
  },
});

export default instance;
