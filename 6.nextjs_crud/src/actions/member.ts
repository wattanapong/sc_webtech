
  'use server';
  import { redirect } from "next/navigation";
  import { revalidatePath } from "next/cache";
  import { prisma } from "@/lib/prisma";

  export async function createmember(formData: FormData) {
    const data = {
      username: formData.get('username') as string,
password: formData.get('password') as string,

    }
    
    const member = await prisma.member.create({ data });

    if (member) {
      redirect(`/members/${member.id}`)
    }
  }

  export async function editmember(formData: FormData) {
    const id = formData.get('id') as string
    try {
      const data = {
        username: formData.get('username') as string,
password: formData.get('password') as string,

      }
      
      await prisma.member.update({
        where: { id: Number(id) },
        data,
      })
    } catch (error) {
      console.error('[EDIT ACTION ERROR:', error)
      return { message: error }
    }

    redirect(`/members/${id}`)
  }

  export async function deletemember (formData: FormData) {
    const id = formData.get('id') as string;
    try {
      await prisma.member.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error('DELETE ACTION ERROR:', error);
      return { message: 'Unable to delete member' };
    }

    revalidatePath(`/members`)
  }
  