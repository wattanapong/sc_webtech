
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { createlocation } from '@/actions/location';
  import { Input } from '@/components/ui/Input';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';
  import { Select } from '@/components/ui/Select';
  
  export default async function locationCreatePage() {
    
    const iot_data = await prisma.iot_datum.findMany();
  
    return (
      <>
        <header className="mb-4">
          <Heading>Create location</Heading>
        </header>
        <form action={createlocation} className="px-2 max-w-xl">
          <div>
    <Input
      type="number"
      label="Location_id"
      name="location_id"
      className="mb-2"
      
      
      required
      
    />
  </div><div>
    <Input
      type="text"
      label="Location_name"
      name="location_name"
      className="mb-2"
      
      
      required
      
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
              href="/locations"
              className="underline text-gray-500"
            >
              Return to locations list
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
  