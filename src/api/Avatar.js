import axios from "axios";

const Avatar = axios.create({
  baseURL: "https://ui-avatars.com",
});

export default Avatar;
