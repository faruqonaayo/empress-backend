// importing 3rd party modules
import mongoose from "mongoose";

// category schema
const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
    categoryImage: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
