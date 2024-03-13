
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { createiot_data } from '@/actions/iot_data';
  import { Input } from '@/components/ui/Input';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';
  import { Select } from '@/components/ui/Select';
  
  export default async function iot_dataCreatePage() {
    
    const devices = await prisma.device.findMany();
  
    const locations = await prisma.location.findMany();
  
    return (
      <>
        <header className="mb-4">
          <Heading>Create iot_data</Heading>
        </header>
        <form action={createiot_data} className="px-2 max-w-xl">
          <div>
    <Input
      type="datetime-local"
      label="Timestamp"
      name="timestamp"
      className="mb-2"
      
      
      required
      
    />
  </div><div>
    <Input
      type="number"
      label="Value"
      name="value"
      className="mb-2"
      
      
      required
      
    />
  </div><div>
    
    <Select
      name="device"
      className="mt-1 mb-2"
      label="Device"
      placeholder="Select Device"
      
      required
      
      
      options={devices.map((device) => ({
        label: device.id,
        value: device.id,
      }))}
    />
  
  </div><div>
    
    <Select
      name="location"
      className="mt-1 mb-2"
      label="Location"
      placeholder="Select Location"
      
      required
      
      
      options={locations.map((location) => ({
        label: location.id,
        value: location.id,
      }))}
    />
  
  </div>

          <footer className="flex items-center justify-between mt-2">
            <Link
              href="/iot_data"
              className="underline text-gray-500"
            >
              Return to iot_data list
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
  