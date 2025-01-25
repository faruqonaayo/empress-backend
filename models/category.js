// 3rd party module
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    categoryName: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
