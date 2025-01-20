// 3rd poarty module
import express from "express";
import bodyParser from "body-parser";

const app = express();
const PORT = process.env.PORT || 3000;

// using 3rd party midddleware
app.use(bodyParser.json());

// my routes
app.get("/", (req, res, next) => {
  res
    .status(200)
    .json({ message: "Welcome to empress backen REST API", statusCode: 200 });
});

app.post("/product", (req, res, next) => {
  console.log(req.body);

  res.status(200).json({ message: "Created a product", statusCode: 200 });
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
