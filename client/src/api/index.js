import axios from "axios";

const API = axios.create({
  baseURL: "https://ai-image-generator-o5fu.onrender.com/api",
});

export const getPosts = () => API.get("/post");
export const CreatePost = (data) => API.post("/post", data);
export const GenerateAIImage = (data) => API.post("/generateImage", data);
