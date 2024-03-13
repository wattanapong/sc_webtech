
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { editsensor_type } from '@/actions/sensor_type';
  import { Input } from '@/components/ui/Input';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';
  import { Select } from '@/components/ui/Select';

  export default async function sensor_typeEditPage({ params }: { params: { id: string } }) {
    const sensor_type = await prisma.sensor_type.findUnique({
      where: { id: Number(params.id) },
      include: {
        device: true
      }
      
    });

    
    
      const devices = await prisma.device.findMany();
  
    
    if (!sensor_type) {
      return (
    <>
      <header>
        <Heading>sensor_type not found</Heading>
      </header>
      <footer>
        <Link href="/sensor_types">
          Return to sensor_types list
        </Link>
      </footer>
    </>
  )
    }

    return (
      <>
        <header className="mb-4">
          <Heading>Edit sensor_type</Heading>
        </header>
        <form action={editsensor_type} className="px-2 max-w-xl">
          <div>
    <Input
      type="number"
      label="Sensor_type_id"
      name="sensor_type_id"
      className="mb-2"
      
      defaultValue={sensor_type.sensor_type_id}
      required
      
    />
  </div><div>
    <Input
      type="text"
      label="Type_name"
      name="type_name"
      className="mb-2"
      
      defaultValue={sensor_type.type_name}
      required
      
    />
  </div><div>
    <Input
      type="text"
      label="Unit"
      name="unit"
      className="mb-2"
      
      defaultValue={sensor_type.unit}
      
      
    />
  </div><div>
    
    <Select
      name="device"
      className="mt-1 mb-2"
      label="Device"
      placeholder="Select Device"
      defaultValue={sensor_type.device.map((device) => ({ label: device.id, value: device.id}))}
      
      
      isMulti
      options={devices.map((device) => ({
        label: device.id,
        value: device.id,
      }))}
    />
  
  </div>

          <input type="hidden" name="id" value={sensor_type.id} />

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
              Update
            </Button>
          </footer>
        </form>
      </>
    )
  }
  