const { MongoClient } = require("mongodb");

const uri = "mongodb://localhost:27017"; // Update if your MongoDB runs elsewhere
const dbName = "tribedb";
const collectionName = "tribes_data";

const literacyData = [
  { state: "Andhra Pradesh", education: { average_literacy_rate: 0.67, minimum_literacy_rate: 0.55, maximum_literacy_rate: 0.75 } },
  { state: "Arunachal Pradesh", education: { average_literacy_rate: 0.65, minimum_literacy_rate: 0.50, maximum_literacy_rate: 0.72 } },
  { state: "Assam", education: { average_literacy_rate: 0.73, minimum_literacy_rate: 0.60, maximum_literacy_rate: 0.80 } },
  { state: "Bihar", education: { average_literacy_rate: 0.55, minimum_literacy_rate: 0.40, maximum_literacy_rate: 0.65 } },
  { state: "Chhattisgarh", education: { average_literacy_rate: 0.70, minimum_literacy_rate: 0.60, maximum_literacy_rate: 0.78 } },
  { state: "Goa", education: { average_literacy_rate: 0.88, minimum_literacy_rate: 0.80, maximum_literacy_rate: 0.92 } },
  { state: "Gujarat", education: { average_literacy_rate: 0.79, minimum_literacy_rate: 0.70, maximum_literacy_rate: 0.85 } },
  { state: "Haryana", education: { average_literacy_rate: 0.76, minimum_literacy_rate: 0.65, maximum_literacy_rate: 0.82 } },
  { state: "Himachal Pradesh", education: { average_literacy_rate: 0.83, minimum_literacy_rate: 0.75, maximum_literacy_rate: 0.88 } },
  { state: "Jharkhand", education: { average_literacy_rate: 0.62, minimum_literacy_rate: 0.50, maximum_literacy_rate: 0.70 } },
  { state: "Karnataka", education: { average_literacy_rate: 0.75, minimum_literacy_rate: 0.65, maximum_literacy_rate: 0.82 } },
  { state: "Kerala", education: { average_literacy_rate: 0.94, minimum_literacy_rate: 0.90, maximum_literacy_rate: 0.97 } },
  { state: "Madhya Pradesh", education: { average_literacy_rate: 0.69, minimum_literacy_rate: 0.60, maximum_literacy_rate: 0.76 } },
  { state: "Maharashtra", education: { average_literacy_rate: 0.82, minimum_literacy_rate: 0.75, maximum_literacy_rate: 0.88 } },
  { state: "Manipur", education: { average_literacy_rate: 0.79, minimum_literacy_rate: 0.70, maximum_literacy_rate: 0.85 } },
  { state: "Meghalaya", education: { average_literacy_rate: 0.75, minimum_literacy_rate: 0.65, maximum_literacy_rate: 0.82 } },
  { state: "Mizoram", education: { average_literacy_rate: 0.91, minimum_literacy_rate: 0.85, maximum_literacy_rate: 0.95 } },
  { state: "Nagaland", education: { average_literacy_rate: 0.80, minimum_literacy_rate: 0.70, maximum_literacy_rate: 0.86 } },
  { state: "Odisha", education: { average_literacy_rate: 0.73, minimum_literacy_rate: 0.60, maximum_literacy_rate: 0.80 } },
  { state: "Punjab", education: { average_literacy_rate: 0.82, minimum_literacy_rate: 0.75, maximum_literacy_rate: 0.88 } },
  { state: "Rajasthan", education: { average_literacy_rate: 0.66, minimum_literacy_rate: 0.55, maximum_literacy_rate: 0.75 } },
  { state: "Sikkim", education: { average_literacy_rate: 0.81, minimum_literacy_rate: 0.75, maximum_literacy_rate: 0.87 } },
  { state: "Tamil Nadu", education: { average_literacy_rate: 0.80, minimum_literacy_rate: 0.70, maximum_literacy_rate: 0.86 } },
  { state: "Telangana", education: { average_literacy_rate: 0.72, minimum_literacy_rate: 0.60, maximum_literacy_rate: 0.80 } },
  { state: "Tripura", education: { average_literacy_rate: 0.87, minimum_literacy_rate: 0.80, maximum_literacy_rate: 0.92 } },
  { state: "Uttar Pradesh", education: { average_literacy_rate: 0.67, minimum_literacy_rate: 0.55, maximum_literacy_rate: 0.75 } },
  { state: "Uttarakhand", education: { average_literacy_rate: 0.79, minimum_literacy_rate: 0.70, maximum_literacy_rate: 0.85 } },
  { state: "West Bengal", education: { average_literacy_rate: 0.77, minimum_literacy_rate: 0.65, maximum_literacy_rate: 0.84 } }
];

async function main() {
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    for (const entry of literacyData) {
      const { state, education } = entry;
      const result = await collection.updateMany(
        { state },
        { $set: { education } }
      );
      console.log(`Updated ${result.modifiedCount} document(s) for state: ${state}`);
    }
  } finally {
    await client.close();
  }
}

main().catch(console.error); 