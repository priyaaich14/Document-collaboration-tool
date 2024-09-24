import mongoose from "mongoose";

const DocumentSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: Object, required: true },
    userId: { type: String, required: true },
  },
  {
    timestamps: true, // Adjusted timestamps
  }
);

export default mongoose.model("Document", DocumentSchema);
