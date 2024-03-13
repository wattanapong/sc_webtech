
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { editiot_data } from '@/actions/iot_data';
  import { Input } from '@/components/ui/Input';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';
  import { Select } from '@/components/ui/Select';

  export default async function iot_dataEditPage({ params }: { params: { id: string } }) {
    const iot_data = await prisma.iot_data.findUnique({
      where: { id: Number(params.id) },
      include: {
        device: true,
location: true
      }
      
    });

    
    
      const devices = await prisma.device.findMany();
  
    
      const locations = await prisma.location.findMany();
  
    
    if (!iot_data) {
      return (
    <>
      <header>
        <Heading>iot_data not found</Heading>
      </header>
      <footer>
        <Link href="/iot_data">
          Return to iot_data list
        </Link>
      </footer>
    </>
  )
    }

    return (
      <>
        <header className="mb-4">
          <Heading>Edit iot_data</Heading>
        </header>
        <form action={editiot_data} className="px-2 max-w-xl">
          <div>
    <Input
      type="datetime-local"
      label="Timestamp"
      name="timestamp"
      className="mb-2"
      
      defaultValue={new Date(iot_data.timestamp).toISOString().slice(0,16)}
      required
      
    />
  </div><div>
    <Input
      type="number"
      label="Value"
      name="value"
      className="mb-2"
      
      defaultValue={iot_data.value}
      required
      
    />
  </div><div>
    
    <Select
      name="device"
      className="mt-1 mb-2"
      label="Device"
      placeholder="Select Device"
      defaultValue={{ label: iot_data.device?.id, value: iot_data.device?.id }}
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
      defaultValue={{ label: iot_data.location?.id, value: iot_data.location?.id }}
      required
      
      
      options={locations.map((location) => ({
        label: location.id,
        value: location.id,
      }))}
    />
  
  </div>

          <input type="hidden" name="id" value={iot_data.id} />

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
              Update
            </Button>
          </footer>
        </form>
      </>
    )
  }
  