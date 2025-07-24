// lib/db.ts
import { MongoClient } from "mongodb";
import mongodb from "../analy/mongodb";

const uri = process.env.MONGODB_URI || "mongodb+srv://sravyareddy:sravya123@sravya.q44m0bl.mongodb.net/states_data?retryWrites=true&w=majority&appName=sravya";
const options = {};

let client;
let clientPromise: Promise<MongoClient>;

// Ensure global type is extended properly in TypeScript
declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (!global._mongoClientPromise) {
  client = new MongoClient(uri, options);
  global._mongoClientPromise = client.connect();
}

clientPromise = global._mongoClientPromise!;

export async function connectToDB() {
  const client = await clientPromise;
  const db = client.db("states_data");
  return { db };
}
