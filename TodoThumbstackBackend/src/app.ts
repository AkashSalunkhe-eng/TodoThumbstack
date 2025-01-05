import express, { Application, Request, Response } from "express";
import configRoute from "./routes/config-routes"
import mongoose from "mongoose";
import documentRoute from "./routes/task-routes"
import cors from "cors"
require('dotenv').config();

const app: Application = express();
const PORT = process.env.PORT || 5055;

const MONGO_URI = process.env.MONGO_URI || "";

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));


// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

// Routes
app.get("/api", (req: Request, res: Response) => {
  res.send("Hello, TypeScript Backend!");
});

app.use("/api", configRoute);
app.use("/api", documentRoute);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
