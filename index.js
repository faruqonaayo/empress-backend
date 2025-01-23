// 3rd poarty module
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

// custom routes
import serverResponse from "./utils/serverResponse.js";
import adminRoutes from "./routes/admin.js";

const app = express();

// loading environment variables to process.env
dotenv.config();

const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;
const DB_NAME = process.env.DB_NAME;

// connect  to db
mongoose.connect(DB_URI, { dbName: DB_NAME });

// using 3rd party midddleware
app.use(cors());
app.use(bodyParser.json());

// my routes
app.get("/", (req, res, next) => {
  return serverResponse(res, 200, "Welcome to empress backen REST API");
});
app.use("/api/admin", adminRoutes);

// not found route
app.use((req, res, next) => {
  return serverResponse(res, 404, "Route not found");
});

// error route
app.use((error, req, res, next) => {
  console.log(error);
  return serverResponse(res, 500, "Internal server error");
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
