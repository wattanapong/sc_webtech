
// pages/api/locations.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  
  if (req.method === 'GET') {
    try {
      const id = req.query.id;
      let locations;

      if (id && Number(id) > 0 ){
        locations = await prisma.location.findFirst({
          where:{
            location_id: Number(id)
          }
        })
      }else{
        locations = await prisma.location.findMany();
      }
      
      res.status(200).json(locations);
    } catch (error) {
      console.error('Error fetching locations:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}