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
};

const uploadHandler = async (req, res, next) => {
  upload(req, res, async err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    try {
      // const link = await uploadToImgur(req.file.buffer);
      console.log(req.file.buffer);
      // req.body.imageUrl = link;
      next();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

export default uploadHandler;
