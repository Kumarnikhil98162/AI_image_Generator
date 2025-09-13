// src/components/GenerateImageForm.jsx
import React, { useState } from "react";
import { GenerateAIImage } from "../api"; // your API helper

function GenerateImageForm() {
  const [post, setPost] = useState({ prompt: "", photo: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleGenerate = async () => {
    if (!post.prompt) {
      setError("Please enter a prompt first");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const res = await GenerateAIImage({ prompt: post.prompt });
      setPost((prev) => ({ ...prev, photo: res?.data?.photo || "" }));
    } catch (err) {
      setError(err?.response?.data?.message || "Image generation failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        AI Image Generator
      </h2>

      {/* Prompt Input */}
      <textarea
        name="prompt"
        value={post.prompt}
        onChange={handleChange}
        placeholder="Enter your prompt..."
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
        rows="4"
      />

      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Generate Button */}
      <button
        onClick={handleGenerate}
        disabled={loading}
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Image"}
      </button>

      {/* Image Preview */}
      {post.photo && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Preview:</h3>
          <img
            src={post.photo}
            alt="Generated"
            className="w-full rounded-lg border"
          />
        </div>
      )}
    </div>
  );
}

export default GenerateImageForm;
