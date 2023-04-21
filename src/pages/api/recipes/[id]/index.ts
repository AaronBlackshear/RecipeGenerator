import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { slug } = req.query;

  const data = await getSession(req, res);
  if (!data?.user) res.status(401).json({ message: "Unauthorized user" })

  const slugFilter = typeof slug === 'string' && slug

  const recipe = await prisma.recipe.findFirst({
    where: {
      userId: data?.user?.sub,
      slug: {
        equals: slugFilter ? slug : undefined
      }
    }
  })
  res.status(200).json({ recipe })
}
