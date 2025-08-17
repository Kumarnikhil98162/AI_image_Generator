import axios from "axios";

const API = axios.create({
  baseURL: "https://my-backend-api.onrender.com/api",
});

export const getPosts = () => API.get("/post");
export const CreatePost = (data) => API.post("/post", data);
export const GenerateAIImage = (data) => API.post("/generateImage", data);
