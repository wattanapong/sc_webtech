
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { editlocation } from '@/actions/location';
  import { Input } from '@/components/ui/Input';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';
  import { Select } from '@/components/ui/Select';

  export default async function locationEditPage({ params }: { params: { id: string } }) {
    const location = await prisma.location.findUnique({
      where: { id: Number(params.id) },
      include: {
        iot_data: true
      }
      
    });

    
    
      const iot_data = await prisma.iot_datum.findMany();
  
    
    if (!location) {
      return (
    <>
      <header>
        <Heading>location not found</Heading>
      </header>
      <footer>
        <Link href="/locations">
          Return to locations list
        </Link>
      </footer>
    </>
  )
    }

    return (
      <>
        <header className="mb-4">
          <Heading>Edit location</Heading>
        </header>
        <form action={editlocation} className="px-2 max-w-xl">
          <div>
    <Input
      type="number"
      label="Location_id"
      name="location_id"
      className="mb-2"
      
      defaultValue={location.location_id}
      required
      
    />
  </div><div>
    <Input
      type="text"
      label="Location_name"
      name="location_name"
      className="mb-2"
      
      defaultValue={location.location_name}
      required
      
    />
  </div><div>
    
    <Select
      name="iot_data"
      className="mt-1 mb-2"
      label="Iot_data"
      placeholder="Select Iot_data"
      defaultValue={location.iot_data.map((iot_datum) => ({ label: iot_datum.id, value: iot_datum.id}))}
      
      
      isMulti
      options={iot_data.map((iot_datum) => ({
        label: iot_datum.id,
        value: iot_datum.id,
      }))}
    />
  
  </div>

          <input type="hidden" name="id" value={location.id} />

          <footer className="flex items-center justify-between mt-2">
            <Link
              href="/locations"
              className="underline text-gray-500"
            >
              Return to locations list
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
  