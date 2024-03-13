
  import Link from 'next/link';
  import { prisma } from '@/lib/prisma';
  import { createmember } from '@/actions/member';
  import { Input } from '@/components/ui/Input';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';
  
  
  export default async function memberCreatePage() {
    
    return (
      <>
        <header className="mb-4">
          <Heading>Create member</Heading>
        </header>
        <form action={createmember} className="px-2 max-w-xl">
          <div>
    <Input
      type="text"
      label="Username"
      name="username"
      className="mb-2"
      
      
      
      
    />
  </div><div>
    <Input
      type="text"
      label="Password"
      name="password"
      className="mb-2"
      
      
      
      
    />
  </div>

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
              Create
            </Button>
          </footer>
        </form>
      </>
    )
  }
  