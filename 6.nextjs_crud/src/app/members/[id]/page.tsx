
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { Heading } from '@/components/ui/Heading';

  export default async function memberPage({ params }: { params: { id: string } }) {
    const member = await prisma.member.findUnique({
      where: { id: Number(params.id) }
    });
    
    if (!member) {
      return (
    <>
      <header>
        <Heading>member not found</Heading>
      </header>
      <footer>
        <Link href="/members">
          Return to members list
        </Link>
      </footer>
    </>
  )
    }

    return (
      <>
        <header className="mt-2 mb-4">
          <Heading>member #{member.id}</Heading>
        </header>

        <section className="relative overflow-hidden rounded-lg border border-gray-200 p-4 sm:p-6 lg:p-8 max-w-xl mb-4">
          <span
            className="absolute inset-x-0 bottom-0 h-21 bg-gradient-to-r from-indigo-300 via-indigo-500 to-indigo-600"
          ></span>
          <p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">Username:</strong> {member.username}</p><p className="text-gray-700 mb-4 last:mb-0"><strong className="text-gray-900">Password:</strong> {member.password}</p>
        </section>

        <footer>
          <Link
            href="/members"
            className="underline text-gray-500"
          >
            Return to members list
          </Link>
        </footer>
      </>
    )
  }
  