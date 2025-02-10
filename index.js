// importing 3rd party modules
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";

//importing custom routes
import adminRoutes from "./routes/admin.js";

// creating express app
const app = express();

// loading environment variables to process.env
dotenv.config();

// CONSTANTS
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;

// connect to database
mongoose.connect(DB_URI, { dbName: DB_NAME });

// using 3rd party middleware
app.use(cors());
app.use(bodyParser.json());

// application routes
// static routes
app.use(express.static("public"));

app.use("/api/admin", adminRoutes);

// not found routes
app.use((req, res, next) => {
  return res.status(404).json({
    message: "Route not found",
    statusCode: 404,
  });
});

// error routes
app.use((error, req, res, next) => {
  console.log(error);
  return res.status(500).json({
    message: "Internal server error",
    statusCode: 500,
  });
});

// server is listening
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
