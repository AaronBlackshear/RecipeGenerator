import { getSession } from '@auth0/nextjs-auth0';
import prisma from '@lib/prisma';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const data = await getSession(req, res);
  if (!data?.user) res.status(401).json({ message: "Unauthorized user" })

  const recipe = await prisma.recipe.update({
    where: {
      id: (req.query.id as string)
    },
    data: req.body.recipe
  })
  res.status(200).json({ recipe })
}
