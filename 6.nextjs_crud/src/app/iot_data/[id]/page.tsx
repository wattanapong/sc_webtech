
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { Heading } from '@/components/ui/Heading';

  export default async function iot_dataPage({ params }: { params: { id: string } }) {
    const iot_data = await prisma.iot_data.findUnique({
      where: { id: Number(params.id) }
    });
    
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
        <header className="mt-2 mb-4">
          <Heading>iot_data #{iot_data.id}</Heading>
        </header>

        <section className="relative overflow-hidden rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 max-w-xl mb-4">
          <span
            className="absolute inset-x-0 bottom-0 h-21 bg-gradient-to-r from-indigo-300 via-indigo-500 to-indigo-600"
          ></span>
          <p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">Timestamp:</strong> {new Date(iot_data.timestamp).toLocaleString()}</p><p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">Value:</strong> {iot_data.value}</p><p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">Device_id:</strong> {iot_data.device_id}</p><p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">Location_id:</strong> {iot_data.location_id}</p>
        </section>

        <footer>
          <Link
            href="/iot_data"
            className="underline text-gray-500"
          >
            Return to iot_data list
          </Link>
        </footer>
      </>
    )
  }
  