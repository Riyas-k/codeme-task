import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./mongodb/config.js";
import bodyParser from "body-parser";
import authRoutes from "./controllers/authController.js";
import questionRoutes from "./controllers/questionController.js";


const app = express();

app.use(cors());
app.use(express.json());

//db connection
connectDB();

// Routes
app.use("/api", authRoutes);
app.use("/api", questionRoutes);

// app.use(bodyParser())
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Sever started on ${PORT}`);
});
