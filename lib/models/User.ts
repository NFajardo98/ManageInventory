import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  clerkId: String,
  favorites: {
    type: Array,
    default: []
  },
  orders: {
    type: Array,
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;