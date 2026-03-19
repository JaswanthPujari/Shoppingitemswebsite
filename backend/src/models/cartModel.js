import mongoose from "mongoose";

const cartSchema = new mongoose.Schema({
  productId: { type: String, required: true, unique: true },
  title: String,
  price: Number,
  imageUrl: String,
  brand: String,
  qty: { type: Number, default: 1 }
});

export default mongoose.model("Cart", cartSchema);