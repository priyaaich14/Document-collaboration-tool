import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  displayName: { type: String },
  photoURL: { type: String },
});

export default mongoose.model("User", UserSchema);
