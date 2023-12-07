import axios from "axios";

const connection = axios.create({
  baseURL: "http://localhost:3000",
});

export default connection;
