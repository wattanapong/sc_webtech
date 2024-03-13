
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { Heading } from '@/components/ui/Heading';

  export default async function devicePage({ params }: { params: { id: string } }) {
    const device = await prisma.device.findUnique({
      where: { id: params.id }
    });
    
    if (!device) {
      return (
    <>
      <header>
        <Heading>device not found</Heading>
      </header>
      <footer>
        <Link href="/devices">
          Return to devices list
        </Link>
      </footer>
    </>
  )
    }

    return (
      <>
        <header className="mt-2 mb-4">
          <Heading>device #{device.id.substring(0,6)}...</Heading>
        </header>

        <section className="relative overflow-hidden rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 max-w-xl mb-4">
          <span
            className="absolute inset-x-0 bottom-0 h-21 bg-gradient-to-r from-indigo-300 via-indigo-500 to-indigo-600"
          ></span>
          <p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">Device_id:</strong> {device.device_id}</p><p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">Device_name:</strong> {device.device_name}</p><p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">Manufacture_id:</strong> {device.manufacture_id}</p><p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">Sensor_type_id:</strong> {device.sensor_type_id}</p>
        </section>

        <footer>
          <Link
            href="/devices"
            className="underline text-gray-500"
          >
            Return to devices list
          </Link>
        </footer>
      </>
    )
  }
  