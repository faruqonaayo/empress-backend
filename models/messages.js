// 3rd party module
import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    sender: { type: String, required: true },
    recipient: { type: String, required: true },
    subjectLine: { type: String, required: true },
    message: { type: String, required: true },
    dateTime: { type: Date, required: true },
    attachments: [{ type: String }],
  },
  { timestamps: true }
);

export default mongoose.model("Message", messageSchema);
