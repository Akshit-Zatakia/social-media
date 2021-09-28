import axios from "axios";

const baseURL = "http://localhost:8081/api/";

const instance = axios.create({
  baseURL,
  headers: {
    "Content-type": "application/json",
  },
});

export default instance;
