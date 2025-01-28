// 3rd party module
import mongoose, { Schema } from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    province: { type: String, required: true },
    postCode: { type: String, required: true },
    phoneNumber: { type: Number, required: true },
    password: { type: String, required: true },
    favourites: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  },
  { timestamps: true }
);

export default mongoose.model("Customer", customerSchema);
