
  'use server';
  import { redirect } from "next/navigation";
  import { revalidatePath } from "next/cache";
  import { prisma } from "@/lib/prisma";

  export async function createmanufacture(formData: FormData) {
    const data = {
      name: formData.get('name') as string,
device: formData.get('device') != '' ? {
    connect: formData.getAll('device').map(deviceId => ({ id: deviceId as undefined}))
  } : {},

    }
    
    const manufacture = await prisma.manufacture.create({ data });

    if (manufacture) {
      redirect(`/manufactures/${manufacture.id}`)
    }
  }

  export async function editmanufacture(formData: FormData) {
    const id = formData.get('id') as string
    try {
      const data = {
        name: formData.get('name') as string,
device: formData.get('device') != '' ? {
    connect: formData.getAll('device').map(deviceId => ({ id: deviceId as undefined}))
  } : { deleteMany: {} },

      }
      
      await prisma.manufacture.update({
        where: { id: Number(id) },
        data,
      })
    } catch (error) {
      console.error('[EDIT ACTION ERROR:', error)
      return { message: error }
    }

    redirect(`/manufactures/${id}`)
  }

  export async function deletemanufacture (formData: FormData) {
    const id = formData.get('id') as string;
    try {
      await prisma.manufacture.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error('DELETE ACTION ERROR:', error);
      return { message: 'Unable to delete manufacture' };
    }

    revalidatePath(`/manufactures`)
  }
  