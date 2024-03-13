// pages/location.tsx
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import '../../app/css/bootstrap.min.css'
import '../../app/css/all.min.css'

const prisma = new PrismaClient();

export default function Page() {
  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    // Fetch data from an API
    fetch('/api/locations')
      .then((response) => response.json())
      .then((result) => setLocations(result))
      .catch((error) => console.error('Error fetching data:', error));
  }, []); // Empty dependency array means this effect runs once after the initial render


  return (
    <div className="container mt-4">
      <h1>Data Display</h1>
      <table className="table mt-4  w-25 mx-auto">
        <thead>
          <tr>
            <th className="col-2">ID</th>
            <th className="col-4">Location Name</th>
            <th className='col-2'></th>
          </tr>
        </thead>
        <tbody>
          {locations.map((row, index) => (
            <tr key={index}>
              <td>
              {row.location_id}
              </td>
              <td>
                {row.location_name}
              </td>
              <td>
                <a href={`/location/update?id=${row.location_id}`}><i className="fa-solid fa-pen-to-square"></i></a>
              <a href={`/location/delete?id=${row.location_id}`}><i className="fa-solid fa-trash-can"></i></a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}