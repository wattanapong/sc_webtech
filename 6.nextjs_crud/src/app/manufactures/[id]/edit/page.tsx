
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { editmanufacture } from '@/actions/manufacture';
  import { Input } from '@/components/ui/Input';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';
  import { Select } from '@/components/ui/Select';

  export default async function manufactureEditPage({ params }: { params: { id: string } }) {
    const manufacture = await prisma.manufacture.findUnique({
      where: { id: Number(params.id) },
      include: {
        device: true
      }
      
    });

    
    
      const devices = await prisma.device.findMany();
  
    
    if (!manufacture) {
      return (
    <>
      <header>
        <Heading>manufacture not found</Heading>
      </header>
      <footer>
        <Link href="/manufactures">
          Return to manufactures list
        </Link>
      </footer>
    </>
  )
    }

    return (
      <>
        <header className="mb-4">
          <Heading>Edit manufacture</Heading>
        </header>
        <form action={editmanufacture} className="px-2 max-w-xl">
          <div>
    <Input
      type="text"
      label="Name"
      name="name"
      className="mb-2"
      
      defaultValue={manufacture.name}
      
      
    />
  </div><div>
    
    <Select
      name="device"
      className="mt-1 mb-2"
      label="Device"
      placeholder="Select Device"
      defaultValue={manufacture.device.map((device) => ({ label: device.id, value: device.id}))}
      
      
      isMulti
      options={devices.map((device) => ({
        label: device.id,
        value: device.id,
      }))}
    />
  
  </div>

          <input type="hidden" name="id" value={manufacture.id} />

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
              Update
            </Button>
          </footer>
        </form>
      </>
    )
  }
  