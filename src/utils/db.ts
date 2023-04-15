import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${encodeURI(process.env.MONGO_PASSWORD || '')}${process.env.MONGO_CONNECTION_URL}/?retryWrites=true&w=majority`;

export function createClient() {
  return new MongoClient(uri);
}