import Post from "../models/Posts.js";
import { v2 as cloudinary } from "cloudinary";
import * as dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch posts" });
  }
};

export const createPost = async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;

    console.log("📩 Incoming post data:", { name, prompt, photoLength: photo?.length });

    const uploaded = await cloudinary.uploader.upload(photo);
    console.log("✅ Cloudinary upload success:", uploaded.secure_url);

    const newPost = await Post.create({
      name,
      prompt,
      photo: uploaded.secure_url,
    });

    res.status(201).json({ success: true, data: newPost });
  } catch (error) {
    console.error("❌ Create Post Error:", error);
    res.status(500).json({ success: false, message: error.message || "Failed to create post" });
  }
};

