
  'use server';
  import { redirect } from "next/navigation";
  import { revalidatePath } from "next/cache";
  import { prisma } from "@/lib/prisma";

  export async function createlocation(formData: FormData) {
    const data = {
      location_id: formData.get('location_id') as number,
location_name: formData.get('location_name') as string,
iot_data: formData.get('iot_data') != '' ? {
    connect: formData.getAll('iot_data').map(iot_datumId => ({ id: Number(iot_datumId)}))
  } : {},

    }
    
    const location = await prisma.location.create({ data });

    if (location) {
      redirect(`/locations/${location.id}`)
    }
  }

  export async function editlocation(formData: FormData) {
    const id = formData.get('id') as string
    try {
      const data = {
        location_id: formData.get('location_id') as number,
location_name: formData.get('location_name') as string,
iot_data: formData.get('iot_data') != '' ? {
    connect: formData.getAll('iot_data').map(iot_datumId => ({ id: Number(iot_datumId)}))
  } : { deleteMany: {} },

      }
      
      await prisma.location.update({
        where: { id },
        data,
      })
    } catch (error) {
      console.error('[EDIT ACTION ERROR:', error)
      return { message: error }
    }

    redirect(`/locations/${id}`)
  }

  export async function deletelocation (formData: FormData) {
    const id = formData.get('id') as string;
    try {
      await prisma.location.delete({
        where: { id },
      });
    } catch (error) {
      console.error('DELETE ACTION ERROR:', error);
      return { message: 'Unable to delete location' };
    }

    revalidatePath(`/locations`)
  }
  