// server/routes/GenerateAIImage.js
import express from "express";
import { generateImage } from "../controllers/GenerateAIImage.js";

const router = express.Router();

router.post("/", async (req, res, next) => {
  console.log("✅ POST /api/generateImage route hit");
  try {
    await generateImage(req, res, next);
  } catch (err) {
    console.error("❌ Error in route handler:", err);
    res.status(500).json({ message: "Something went wrong in route." });
  }
});

export default router;
