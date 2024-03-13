
// pages/api/locations.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function location_insert(req: NextApiRequest, res: NextApiResponse) {

  if (req.method === 'POST') {
    try {
      const { location_id, location_name } = req.body;

      if (location_id) {
        const user = await prisma.location.update({
          where: {
            location_id: location_id,
          },
          data: {
            location_name: location_name,
          },
        });
      } else {
        const user = await prisma.location.create({
          data: {
            location_id,
            location_name
          },
        });
      }

      res.status(200).json({ 'msg': 'Completed' });
    } catch (error) {
      console.error('Error insert location:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}