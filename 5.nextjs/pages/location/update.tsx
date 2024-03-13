// pages/location.tsx
import { PrismaClient } from '@prisma/client';
import { useEffect, useState } from 'react';
import '../../app/css/bootstrap.min.css'
import '../../app/css/all.min.css'
import { NextApiRequest, NextApiResponse } from 'next';
import { useRouter } from 'next/router';

const prisma = new PrismaClient();

export default function update() {
  const [location, setLocation] = useState<any[]>([]);
  const [location_name, setLocationName] = useState<any>([]);
  const [location_id, setLocationId] = useState<any>([]);
  const router = useRouter()

  useEffect(() => {

    let id = router.query.id
    console.log('id in useEffect', id)
    // Fetch data from an API
    fetch('/api/locations?id=' + id)
      .then((response) => response.json())
      // .then((result) => setLocation(result))
      .then((result) => {
        setLocationName(result.location_name)
        setLocationId(result.location_id)
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, [router.query.id]);


  

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {

      const response = await fetch('/api/locations/insert', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ location_id: location_id, location_name: location_name })
      });

      if (response.ok) {
        console.log('Location created successfully');

        console.log(response)
        // Reset form or perform any other action upon successful creation
      } else {
        console.error('Failed to create location');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div><a href="/location/index.html">Main</a></div>
          <div className="card">
            <div className="card-header">
              <h3 className="text-center"><i className="fas fa-map-marker-alt"></i> Add New Location</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <input type="hidden" name="location_id" id="location_id" value={location_id} onChange={(e) => setLocationId(e.target.value)} />
                  <label>
                    <input type="text" className="form-control" id="location_name" name="location_name"
                      placeholder="Enter location name" value={location_name} onChange={(e) => setLocationName(e.target.value)} />
                  </label>
                </div>
                <br></br>
                <button type="submit" className="btn btn-primary btn-block"><i className="fas fa-save"></i></button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}