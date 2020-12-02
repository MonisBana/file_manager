import axios from "axios";

const instance = axios.create({
  baseURL: "https://interview.skizzle.email/",
});

export default instance;
