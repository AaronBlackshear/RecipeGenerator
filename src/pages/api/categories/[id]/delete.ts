import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@utils/db';
import { ObjectId } from 'mongodb';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = createClient();
  try {
    const categoryId: string = (req.query.id as string);

    if (!categoryId) throw new Error('Missing valid id!');

    const db = client.db('recipe_generator');
    await db
      .collection("categories")
      .deleteOne({ _id: new ObjectId(categoryId) })

    res.status(200).json({ id: categoryId })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
