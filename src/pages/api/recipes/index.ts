import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { search } = req.query;

  const data = await getSession(req, res);
  if (!data?.user) res.status(401).json({ message: "Unauthorized user" })

  const searchFilter = typeof search === 'string' && search

  const recipes = await prisma.recipe.findMany({
    where: {
      userId: data?.user?.sub,
      title: {
        contains: searchFilter ? search : '',
        mode: 'insensitive'
      },
    }
  })
  res.status(200).json({ recipes })
}
