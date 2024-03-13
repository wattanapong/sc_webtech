
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { Heading } from '@/components/ui/Heading';

  export default async function sensor_typePage({ params }: { params: { id: string } }) {
    const sensor_type = await prisma.sensor_type.findUnique({
      where: { id: params.id }
    });
    
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
        <header className="mt-2 mb-4">
          <Heading>sensor_type #{sensor_type.id.substring(0,6)}...</Heading>
        </header>

        <section className="relative overflow-hidden rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 max-w-xl mb-4">
          <span
            className="absolute inset-x-0 bottom-0 h-21 bg-gradient-to-r from-indigo-300 via-indigo-500 to-indigo-600"
          ></span>
          <p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">Sensor_type_id:</strong> {sensor_type.sensor_type_id}</p><p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">Type_name:</strong> {sensor_type.type_name}</p><p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">Unit:</strong> {sensor_type.unit}</p>
        </section>

        <footer>
          <Link
            href="/sensor_types"
            className="underline text-gray-500"
          >
            Return to sensor_types list
          </Link>
        </footer>
      </>
    )
  }
  