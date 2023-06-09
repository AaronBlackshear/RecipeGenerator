import prisma from '@lib/prisma';
import { validateRecipeFormat } from '@shared/utils/recipe';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (!validateRecipeFormat(req.body.recipe)) res.status(400).json({ message: "Invalid recipe format" })

  const recipes = await prisma.recipe.create({ data: req.body.recipe });
  res.status(200).json({ recipes })
}
