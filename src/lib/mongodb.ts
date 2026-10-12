import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI || "";
const dbName = process.env.MONGODB_DB || "portfolio";

let client: MongoClient | null = null;
let clientPromise: Promise<MongoClient> | null = null;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (uri) {
  if (process.env.NODE_ENV === "development") {
    if (!global._mongoClientPromise) {
      client = new MongoClient(uri);
      global._mongoClientPromise = client.connect();
    }
    clientPromise = global._mongoClientPromise;
  } else {
    client = new MongoClient(uri);
    clientPromise = client.connect();
  }
}

export async function getMongoClient(): Promise<MongoClient | null> {
  if (!uri || !clientPromise) {
    return null;
  }
  try {
    return await clientPromise;
  } catch (error) {
    console.error("[MongoDB] Connection failure:", error);
    return null;
  }
}

export async function getDb(): Promise<Db | null> {
  const mClient = await getMongoClient();
  if (!mClient) return null;
  return mClient.db(dbName);
}

export default clientPromise;
