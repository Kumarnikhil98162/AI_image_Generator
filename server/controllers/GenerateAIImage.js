import axios from "axios";
import FormData from "form-data";

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    console.log("📝 Prompt received:", prompt);

    const formdata = new FormData();
    formdata.append("prompt", prompt);

    const { data } = await axios.post(
      "https://clipdrop-api.co/text-to-image/v1",
      formdata,
      {
        headers: {
          ...formdata.getHeaders(),
          "x-api-key": process.env.CLIPDROP_API_KEY, 
        },
        responseType: "arraybuffer",
      }
    );

    // Convert ArrayBuffer to Base64
    const base64Image = Buffer.from(data, "binary").toString("base64");
    const resultImage = `data:image/png;base64,${base64Image}`;

    res.status(200).json({ photo: resultImage });
  } catch (error) {
    console.error("❌ Clipdrop Error:", error.message);
    if (error.response) {
      console.error("🔍 Status:", error.response.status);
      console.error("📦 Data:", error.response.data.toString());
    }
    res.status(500).json({ success: false, message: "Image generation failed" });
  }
};
