import axios from "axios";

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    const response = await axios.post(
      "https://api.openai.com/v1/images/generations",
      {
        model: "dall-e-3",
        prompt: prompt,
        size: "1024x1024",
        response_format: "b64_json",
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    const image = `data:image/png;base64,${response.data.data[0].b64_json}`;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.error("❌ OpenAI Error:", error);
    res.status(500).json({ success: false, message: "Image generation failed" });
  }
};