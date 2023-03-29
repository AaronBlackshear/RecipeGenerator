import { MongoClient, ObjectId } from 'mongodb'
import { NextApiRequest, NextApiResponse } from 'next';

// Replace the uri string with your connection string.
const uri = `mongodb+srv://${process.env.MONGO_USERNAME}:${encodeURI(process.env.MONGO_PASSWORD || '')}${process.env.MONGO_CONNECTION_URL}/?retryWrites=true&w=majority`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = new MongoClient(uri);
  try {
    const recipeId: string = (req.query.slug as string);

    if (!recipeId) throw new Error('Missing valid id!');

    const db = client.db('recipe_generator');
    await db
      .collection("recipes")
      .deleteOne({ _id: new ObjectId(recipeId) })

    res.status(200).json({ id: recipeId })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
