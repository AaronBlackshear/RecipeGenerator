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
    const category = await db
      .collection("categories")
      .updateOne({ _id: new ObjectId(categoryId) }, {
        $set: { ...req.body.category }
      })

    res.status(200).json({ category })
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
