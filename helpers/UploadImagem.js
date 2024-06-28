import multer from "multer";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const imgurClientId = process.env.IMGUR_CLIENT_ID;

if (!imgurClientId) {
  throw new Error("Por favor, configure o IMGUR_CLIENT_ID no arquivo .env");
}

const storage = multer.memoryStorage();

const upload = multer({ storage }).single("image");

const uploadToImgur = async buffer => {
  const maxRetries = 5;
  const baseDelay = 1000; // 1 second

  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      const response = await axios.post(
        "https://api.imgur.com/3/image",
        {
          image: buffer.toString("base64"),
          type: "base64",
        },
        {
          headers: {
            Authorization: `Client-ID ${imgurClientId}`,
          },
        }
      );
      return response.data.data.link;
    } catch (error) {
      if (error.response && error.response.status === 429 && attempt < maxRetries - 1) {
        const delay = baseDelay * Math.pow(2, attempt);
        console.log(`Rate limit exceeded, retrying in ${delay / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        throw error;
      }
    }
  }
  throw new Error("Failed to upload to Imgur after several attempts");
};

const uploadHandler = async (req, res, next) => {
  upload(req, res, async err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      const link = await uploadToImgur(req.file.buffer);
      console.log(link);
      req.body.imageUrl = link;
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

export default uploadHandler;
