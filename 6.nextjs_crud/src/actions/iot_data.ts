
  'use server';
  import { redirect } from "next/navigation";
  import { revalidatePath } from "next/cache";
  import { prisma } from "@/lib/prisma";

  export async function createiot_data(formData: FormData) {
    const data = {
      timestamp: new Date(formData.get('timestamp') as string).toISOString(),
value: formData.get('value') as number,
device: formData.get('device') != '' ? { connect: { id: formData.get('device') as undefined } } : {},
location: formData.get('location') != '' ? { connect: { id: formData.get('location') as undefined } } : {},

    }
    
    const iot_data = await prisma.iot_data.create({ data });

    if (iot_data) {
      redirect(`/iot_data/${iot_data.id}`)
    }
  }

  export async function editiot_data(formData: FormData) {
    const id = formData.get('id') as string
    try {
      const data = {
        timestamp: new Date(formData.get('timestamp') as string).toISOString(),
value: formData.get('value') as number,
device: formData.get('device') != '' ? { connect: { id: formData.get('device') as undefined } } : { disconnect: true },
location: formData.get('location') != '' ? { connect: { id: formData.get('location') as undefined } } : { disconnect: true },

      }
      
      await prisma.iot_data.update({
        where: { id: Number(id) },
        data,
      })
    } catch (error) {
      console.error('[EDIT ACTION ERROR:', error)
      return { message: error }
    }

    redirect(`/iot_data/${id}`)
  }

  export async function deleteiot_data (formData: FormData) {
    const id = formData.get('id') as string;
    try {
      await prisma.iot_data.delete({
        where: { id: Number(id) },
      });
    } catch (error) {
      console.error('DELETE ACTION ERROR:', error);
      return { message: 'Unable to delete iot_data' };
    }

    revalidatePath(`/iot_data`)
  }
  