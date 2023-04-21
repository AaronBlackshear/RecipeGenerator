import { PrismaClient } from '@prisma/client';
import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const recipes = await prisma.recipes.findMany()
  res.status(200).json({ recipes })
}
