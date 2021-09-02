import axios from "axios";

const Api = axios.create({
  /* localhost */
  baseURL: "http://localhost:8000/api",
  /* production */
  // baseURL: "https://adminsport.my.id/api",
});

export default Api;
