// src/models/MainDocument.ts
import mongoose, { Schema } from "mongoose";

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
  festivals: [FestivalSchema],
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

const MainDocumentSchema = new Schema({
  ap: StateSchema,
  tn: StateSchema,
  ts: StateSchema,
});

export default mongoose.models.MainDocument ||
  mongoose.model("MainDocument", MainDocumentSchema, "states_data");
