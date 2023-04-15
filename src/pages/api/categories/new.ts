import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = createClient();
  try {
    const db = client.db('recipe_generator');
    const category = await db
      .collection("categories")
      .insertOne(req.body.category)

    res.status(200).json({ category })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
