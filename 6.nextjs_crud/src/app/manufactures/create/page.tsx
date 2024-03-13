
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { createmanufacture } from '@/actions/manufacture';
  import { Input } from '@/components/ui/Input';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';
  import { Select } from '@/components/ui/Select';
  
  export default async function manufactureCreatePage() {
    
    const devices = await prisma.device.findMany();
  
    return (
      <>
        <header className="mb-4">
          <Heading>Create manufacture</Heading>
        </header>
        <form action={createmanufacture} className="px-2 max-w-xl">
          <div>
    <Input
      type="text"
      label="Name"
      name="name"
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
              href="/manufactures"
              className="underline text-gray-500"
            >
              Return to manufactures list
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
  