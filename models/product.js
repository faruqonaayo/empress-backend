// 3rd party module
import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productName: { type: String, required: true },
    price: { type: Number, required: true },
    sales: { type: Schema.Types.ObjectId, ref: "Sales" },
    stock: { type: Number, required: true },
    visible: { type: Boolean, required: true },
    summary: { type: String, required: true },
    description: { type: String, required: true },
    productCare: { type: String, required: true },
    category: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Category",
    },
    images: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
