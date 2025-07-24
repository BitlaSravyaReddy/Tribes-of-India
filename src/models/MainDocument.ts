// src/models/MainDocument.ts
import mongoose, { Schema } from "mongoose";
import { Jomolhari } from "next/font/google";

const FestivalSchema = new Schema({
  name: String,
  description: String,
});

const TribeSchema = new Schema({
  id: String,
  name: String,
  title: String,
  imageSrc: String,
  imageHint: String,
  history: String,
  origin: String,
  distribution: String,
  festivals: { type: [FestivalSchema], default: undefined },
  livelihood: String,
  challenges: [String],
  beliefs: String,
  practices: [String],
});

const HistoryEntrySchema = new Schema({
  year: String,
  title: String,
  description: String,
});

const StateSchema = new Schema({
  name: String,
  tagline: String,
  history: [HistoryEntrySchema],
  tribes: [TribeSchema],
  stateImage: String,
});

const MainDocumentSchema = new Schema({}, { strict: false });


export default mongoose.models.MainDocument ||
  mongoose.model("MainDocument", MainDocumentSchema, "states_data");
