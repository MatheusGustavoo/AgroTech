import multer from "multer";
import dotenv from "dotenv";
import admin from "firebase-admin";
import serviceAccount from "./firebase_key.json" assert { type: "json" };
import crypto from "crypto";
dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "apiagrotech.appspot.com",
});

const bucket = admin.storage().bucket();

const storage = multer.memoryStorage();
const upload = multer({ storage }).single("image");

const uploadHandler = async (req, res, next) => {
  upload(req, res, async err => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Arquivo inválido" });
    }

    if (
      req.file.mimetype !== "image/jpeg" &&
      req.file.mimetype !== "image/png"
    ) {
      return res.status(400).json({ error: "Formato de imagem inválido" });
    }

    const nomeDoArquivo = req.file.originalname;
    const token = crypto.randomBytes(16).toString("hex");
    const bucketFile = bucket.file(nomeDoArquivo);
    const bucketStream = bucketFile.createWriteStream({
      metadata: {
        contentType: req.file.mimetype,
        metadata: {
          firebaseStorageDownloadTokens: token,
        },
      },
    });

    try {
      bucketStream.on("error", error => {
        res.status(500).json({ error: error.message });
      });

      bucketStream.on("finish", async () => {
        try {
          // Tornar o arquivo público
          await bucketFile.makePublic();

          // Construir a URL com o token
          req.body.imageUrl = `https://firebasestorage.googleapis.com/v0/b/${
            bucket.name
          }/o/${encodeURIComponent(bucketFile.name)}?alt=media&token=${token}`;
          next();
        } catch (error) {
          res.status(500).json({ error: error.message });
        }
      });

      bucketStream.end(req.file.buffer);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

export default uploadHandler;
