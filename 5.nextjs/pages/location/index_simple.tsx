// pages/location.tsx
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';

const prisma = new PrismaClient();

export default function indexSimple() {
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    // Fetch data from an API
    fetch('/api/locations')
      .then((response) => response.json())
      .then((result) => setLocations(result))
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Empty dependency array means this effect runs once after the initial render

  return (
    <div>
      <h1>Locations</h1>
      <ul>
      {locations.length > 0 ? (
        locations.map( (location) => (
            <li>{location.location_id}. {location.location_name}</li>
          ))
      ): (
        <p>No data</p>
      )}
      </ul>
    </div>
  );
}
