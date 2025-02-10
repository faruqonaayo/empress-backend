// importing 3rd party modules
import mongoose from "mongoose";

// category schema
const promotionSchema = new mongoose.Schema(
  {
    promotionName: { type: String, required: true },
    discount: { type: Number, required: true },
    promotionImage: { type: String, required: true },
    expiry: { type: Date, required: true },
  },
  { timestamps: true }
);

export default mongoose.model("Promotion", promotionSchema);
