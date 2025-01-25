// 3rd party module
import mongoose from "mongoose";

const salesSchema = new mongoose.Schema(
  {
    sales: { type: String, required: true },
    discount: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Sales", salesSchema);
