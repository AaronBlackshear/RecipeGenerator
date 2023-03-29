import { MongoClient } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next';

// Replace the uri string with your connection string.
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${encodeURI(process.env.MONGO_PASSWORD || '')}${process.env.MONGO_CONNECTION_URL}/?retryWrites=true&w=majority`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = new MongoClient(uri);
  try {
    const db = client.db('recipe_generator');
    const recipe = await db
      .collection("recipes")
      .insertOne(req.body.recipe)

    res.status(200).json({ recipe })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}