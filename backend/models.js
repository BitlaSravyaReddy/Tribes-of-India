const mongoose = require('mongoose');
const { Schema } = mongoose;

// Festival Schema
const FestivalSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true }
});

// Tribe Schema
const TribeSchema = new Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  title: { type: String, required: true },
  imageSrc: { type: String, required: true },
  imageHint: { type: String, required: true },
  history: { type: String, required: true },
  origin: { type: String, required: true },
  distribution: { type: String, required: true },
  festivals: [FestivalSchema],
  livelihood: { type: String, required: true },
  challenges: [{ type: String }],
  beliefs: { type: String, required: true },
  practices: [{ type: String }]
});

// History Entry Schema
const HistoryEntrySchema = new Schema({
  year: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true }
});

// State Schema
const StateSchema = new Schema({
  name: { type: String, required: true },
  tagline: { type: String, required: true },
  history: [HistoryEntrySchema],
  tribes: [TribeSchema],
  stateImage: { type: String, required: true },
});

// Main Document Schema (for ap, tn, ts)
const MainDocumentSchema = new Schema({
  ap: StateSchema,
  tn: StateSchema,
  ts: StateSchema
});

const buyerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Seller Schema
const sellerSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});





// Product Schema
const productSchema = new mongoose.Schema({
  sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Seller',
    required: true,
  },
  productName: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  artisan:{
    type: String,
    required: true,
  },
  region:{
    type: String,
    required: true,
  },
  tribe:{
    type: String,
    required: true,
  },
  material:{
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

});

const Buyer = mongoose.model('Buyer', buyerSchema);
const Seller = mongoose.model('Seller', sellerSchema);
const Product = mongoose.model('Product', productSchema);

// MainDocument model
const MainDocument = mongoose.model('MainDocument', MainDocumentSchema,'states_data');

module.exports = {
  MainDocument,
  Buyer,
  Seller,
  Product
};
