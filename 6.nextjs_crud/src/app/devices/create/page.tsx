
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { createdevice } from '@/actions/device';
  import { Input } from '@/components/ui/Input';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';
  import { Select } from '@/components/ui/Select';
  
  export default async function deviceCreatePage() {
    
    const manufactures = await prisma.manufacture.findMany();
  
    const sensor_types = await prisma.sensor_type.findMany();
  
    const iot_data = await prisma.iot_datum.findMany();
  
    return (
      <>
        <header className="mb-4">
          <Heading>Create device</Heading>
        </header>
        <form action={createdevice} className="px-2 max-w-xl">
          <div>
    <Input
      type="number"
      label="Device_id"
      name="device_id"
      className="mb-2"
      
      
      required
      
    />
  </div><div>
    <Input
      type="text"
      label="Device_name"
      name="device_name"
      className="mb-2"
      
      
      required
      
    />
  </div><div>
    
    <Select
      name="manufacture"
      className="mt-1 mb-2"
      label="Manufacture"
      placeholder="Select Manufacture"
      
      required
      
      
      options={manufactures.map((manufacture) => ({
        label: manufacture.id,
        value: manufacture.id,
      }))}
    />
  
  </div><div>
    
    <Select
      name="sensor_type"
      className="mt-1 mb-2"
      label="Sensor_type"
      placeholder="Select Sensor_type"
      
      required
      
      
      options={sensor_types.map((sensor_type) => ({
        label: sensor_type.id,
        value: sensor_type.id,
      }))}
    />
  
  </div><div>
    
    <Select
      name="iot_data"
      className="mt-1 mb-2"
      label="Iot_data"
      placeholder="Select Iot_data"
      
      
      
      isMulti
      options={iot_data.map((iot_datum) => ({
        label: iot_datum.id,
        value: iot_datum.id,
      }))}
    />
  
  </div>

          <footer className="flex items-center justify-between mt-2">
            <Link
              href="/devices"
              className="underline text-gray-500"
            >
              Return to devices list
            </Link>
  
            <Button
              type="submit"
            >
              Create
            </Button>
          </footer>
        </form>
      </>
    )
  }
  