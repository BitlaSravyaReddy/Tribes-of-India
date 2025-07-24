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

const MainDocumentSchema = new Schema({
  ap: StateSchema,
  tn: StateSchema,
  ts: StateSchema,
  kerala: StateSchema,
  karnataka: StateSchema,
  madhyapradesh: StateSchema,
  maharashtra: StateSchema,
  arunachal_pradesh: StateSchema,
  assam: StateSchema,
  bihar: StateSchema,
  chattisgarh: StateSchema,
  Goa : StateSchema,
  Gujarat: StateSchema,
  Haryana: StateSchema,
  Himachal: StateSchema,
  jammu: StateSchema,
  Jharkhand: StateSchema,
  Manipur: StateSchema,
  Meghalaya: StateSchema,
  Nagaland: StateSchema,
  Odisha: StateSchema,
  Punjab: StateSchema,
  Rajasthan: StateSchema,
  Sikkim: StateSchema,
  Tripura: StateSchema,
  Uttarakhand: StateSchema,
  UttarPradesh: StateSchema,
  wb: StateSchema,
  
});

export default mongoose.models.MainDocument ||
  mongoose.model("MainDocument", MainDocumentSchema, "states_data");
