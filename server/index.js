import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';

import generateImageRoutes from './routes/GenerateAIImage.js';
import postRoutes from './routes/Post.js';

dotenv.config();

const app = express();

// Basic middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// Debug request logger
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.originalUrl}`);
  next();
});

// Routes
app.use("/api/generateImage", generateImageRoutes);
app.use("/api/post", postRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("✅ Server is up and running");
});

// DB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
        console.log("✅ Connected to MongoDB");

  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1); // Exit with failure
  }
};

// Start server
app.listen(8080, async () => {
  await connectDB();
  console.log("🚀 Server started on http://localhost:8080");
});
