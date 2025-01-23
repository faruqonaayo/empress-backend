// 3rd party module
import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    salesType: { type: String },
    stock: { type: Number, required: true },
    visible: { type: Boolean, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    productCare: { type: String, required: true },
    category: { type: String, required: true },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
