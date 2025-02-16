import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import sequelize from "./models/index";
import postRoutes from "./routes/posts";

dotenv.config();

const app: Application = express(); // ✅ Explicitly define `Application` type
const PORT = process.env.PORT || 5000;

// ✅ Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));

// ✅ Routes
app.use("/api/posts", postRoutes); // ✅ Ensure postRoutes is correctly imported

// ✅ Sync Database & Start Server
sequelize.sync().then(() => {
  console.log("📦 Database connected.");
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
