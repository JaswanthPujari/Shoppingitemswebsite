import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./src/config/db.js";
import cartRoutes from "./src/routes/cartRoutes.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())
app.use("/api/cart", cartRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();