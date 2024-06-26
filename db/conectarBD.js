
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function main() {
  const dbUrl = process.env.DATABASE_URL;
  await mongoose.connect(dbUrl);
  console.log("Conectado");
}
main().catch(err => console.log(err));

export default mongoose;