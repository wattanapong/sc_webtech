
  'use server';
  import { redirect } from "next/navigation";
  import { revalidatePath } from "next/cache";
  import { prisma } from "@/lib/prisma";

  export async function createsensor_type(formData: FormData) {
    const data = {
      sensor_type_id: formData.get('sensor_type_id') as number,
type_name: formData.get('type_name') as string,
unit: formData.get('unit') as string,
device: formData.get('device') != '' ? {
    connect: formData.getAll('device').map(deviceId => ({ id: deviceId as undefined}))
  } : {},

    }
    
    const sensor_type = await prisma.sensor_type.create({ data });

    if (sensor_type) {
      redirect(`/sensor_types/${sensor_type.id}`)
    }
  }

  export async function editsensor_type(formData: FormData) {
    const id = formData.get('id') as string
    try {
      const data = {
        sensor_type_id: formData.get('sensor_type_id') as number,
type_name: formData.get('type_name') as string,
unit: formData.get('unit') as string,
device: formData.get('device') != '' ? {
    connect: formData.getAll('device').map(deviceId => ({ id: deviceId as undefined}))
  } : { deleteMany: {} },

      }
      
      await prisma.sensor_type.update({
        where: { id },
        data,
      })
    } catch (error) {
      console.error('[EDIT ACTION ERROR:', error)
      return { message: error }
    }

    redirect(`/sensor_types/${id}`)
  }

  export async function deletesensor_type (formData: FormData) {
    const id = formData.get('id') as string;
    try {
      await prisma.sensor_type.delete({
        where: { id },
      });
    } catch (error) {
      console.error('DELETE ACTION ERROR:', error);
      return { message: 'Unable to delete sensor_type' };
    }

    revalidatePath(`/sensor_types`)
  }
  