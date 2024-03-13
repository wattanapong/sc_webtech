
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { Heading } from '@/components/ui/Heading';

  export default async function locationPage({ params }: { params: { id: string } }) {
    const location = await prisma.location.findUnique({
      where: { id: params.id }
    });
    
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
        <header className="mt-2 mb-4">
          <Heading>location #{location.id.substring(0,6)}...</Heading>
        </header>

        <section className="relative overflow-hidden rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 max-w-xl mb-4">
          <span
            className="absolute inset-x-0 bottom-0 h-21 bg-gradient-to-r from-indigo-300 via-indigo-500 to-indigo-600"
          ></span>
          <p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">Location_id:</strong> {location.location_id}</p><p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">Location_name:</strong> {location.location_name}</p>
        </section>

        <footer>
          <Link
            href="/locations"
            className="underline text-gray-500"
          >
            Return to locations list
          </Link>
        </footer>
      </>
    )
  }
  