const mongoose = require("mongoose");

const DocumentSchema = new mongoose.Schema(
  {
    _id: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    content: { type: Object, required: true },
    userId: { type: String, required: true, unique: true },
  },
  {
    timestamps: { createdAt: true },
  }
);

module.exports = mongoose.model("Document", DocumentSchema);
