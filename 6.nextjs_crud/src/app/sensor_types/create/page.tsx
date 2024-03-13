
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { createsensor_type } from '@/actions/sensor_type';
  import { Input } from '@/components/ui/Input';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';
  import { Select } from '@/components/ui/Select';
  
  export default async function sensor_typeCreatePage() {
    
    const devices = await prisma.device.findMany();
  
    return (
      <>
        <header className="mb-4">
          <Heading>Create sensor_type</Heading>
        </header>
        <form action={createsensor_type} className="px-2 max-w-xl">
          <div>
    <Input
      type="number"
      label="Sensor_type_id"
      name="sensor_type_id"
      className="mb-2"
      
      
      required
      
    />
  </div><div>
    <Input
      type="text"
      label="Type_name"
      name="type_name"
      className="mb-2"
      
      
      required
      
    />
  </div><div>
    <Input
      type="text"
      label="Unit"
      name="unit"
      className="mb-2"
      
      
      
      
    />
  </div><div>
    
    <Select
      name="device"
      className="mt-1 mb-2"
      label="Device"
      placeholder="Select Device"
      
      
      
      isMulti
      options={devices.map((device) => ({
        label: device.id,
        value: device.id,
      }))}
    />
  
  </div>

          <footer className="flex items-center justify-between mt-2">
            <Link
              href="/sensor_types"
              className="underline text-gray-500"
            >
              Return to sensor_types list
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
  