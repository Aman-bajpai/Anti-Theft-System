import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from 'cors';
import cookieParser from "cookie-parser";
import userAuthRoutes from "./routes/userAuth.route.js";

dotenv.config();

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connected to the MongoDB database");
  })
  .catch((error) => {
    console.log("ERR--> ", error);
  });

const app = express();

app.use(express.json());
app.use(cors({ 
  origin:'http://localhost:5173',
  credentials: true }));
app.use(cookieParser());

app.use("/api/user/auth", userAuthRoutes);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

app.listen(3000, () => {
  console.log("Server listening on port 3000!");
});
