import prisma from '@lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const recipes = await prisma.recipe.findMany()
  res.status(200).json({ recipes })
}
