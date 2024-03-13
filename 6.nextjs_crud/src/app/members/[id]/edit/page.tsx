
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { editmember } from '@/actions/member';
  import { Input } from '@/components/ui/Input';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';
  

  export default async function memberEditPage({ params }: { params: { id: string } }) {
    const member = await prisma.member.findUnique({
      where: { id: Number(params.id) },
      
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
        <header className="mb-4">
          <Heading>Edit member</Heading>
        </header>
        <form action={editmember} className="px-2 max-w-xl">
          <div>
    <Input
      type="text"
      label="Username"
      name="username"
      className="mb-2"
      
      defaultValue={member.username}
      
      
    />
  </div><div>
    <Input
      type="text"
      label="Password"
      name="password"
      className="mb-2"
      
      defaultValue={member.password}
      
      
    />
  </div>

          <input type="hidden" name="id" value={member.id} />

          <footer className="flex items-center justify-between mt-2">
            <Link
              href="/members"
              className="underline text-gray-500"
            >
              Return to members list
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
  