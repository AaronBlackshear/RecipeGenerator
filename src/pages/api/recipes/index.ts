import prisma from '@lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { search } = req.query;

  const searchFilter = typeof search === 'string' && search

  const recipes = await prisma.recipe.findMany(searchFilter ? {
    where: {
      title: {
        contains: search,
        mode: 'insensitive'
      }
    }
  } : undefined)
  res.status(200).json({ recipes })
}
