import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = createClient();
  try {
    const db = client.db('recipe_generator');
    const categories = await db
      .collection("categories")
      .find({})
      .toArray();

    res.status(200).json({ categories })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
