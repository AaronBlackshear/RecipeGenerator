import { validateRecipeFormat } from '@shared/utils/recipe';
import { createClient } from '@utils/db';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const client = createClient()
  try {
    if (!validateRecipeFormat(req.body.recipe)) res.status(400).json({ message: "Invalid recipe format" })

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
