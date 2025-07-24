// src/models/Product.ts
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true,
  },
  productName: { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  quantity:    { type: Number, required: true },
  category:    { type: String, required: true },
  imageUrl:    { type: String, required: true },
  tags:        { type: [String], default: [] },
  artisan:     { type: String, required: true },
  region:      { type: String, required: true },
  tribe:       { type: String, required: true },
  material:    { type: String, required: true },
  createdAt:   { type: Date, default: Date.now },
});

export default mongoose.models.Product || mongoose.model("Product", productSchema);
