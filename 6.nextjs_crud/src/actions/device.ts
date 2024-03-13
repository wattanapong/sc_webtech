
  'use server';
  import { redirect } from "next/navigation";
  import { revalidatePath } from "next/cache";
  import { prisma } from "@/lib/prisma";

  export async function createdevice(formData: FormData) {
    const data = {
      device_id: formData.get('device_id') as number,
device_name: formData.get('device_name') as string,
manufacture: formData.get('manufacture') != '' ? { connect: { id: Number(formData.get('manufacture')) } } : {},
sensor_type: formData.get('sensor_type') != '' ? { connect: { id: formData.get('sensor_type') as undefined } } : {},
iot_data: formData.get('iot_data') != '' ? {
    connect: formData.getAll('iot_data').map(iot_datumId => ({ id: Number(iot_datumId)}))
  } : {},

    }
    
    const device = await prisma.device.create({ data });

    if (device) {
      redirect(`/devices/${device.id}`)
    }
  }

  export async function editdevice(formData: FormData) {
    const id = formData.get('id') as string
    try {
      const data = {
        device_id: formData.get('device_id') as number,
device_name: formData.get('device_name') as string,
manufacture: formData.get('manufacture') != '' ? { connect: { id: Number(formData.get('manufacture')) } } : { disconnect: true },
sensor_type: formData.get('sensor_type') != '' ? { connect: { id: formData.get('sensor_type') as undefined } } : { disconnect: true },
iot_data: formData.get('iot_data') != '' ? {
    connect: formData.getAll('iot_data').map(iot_datumId => ({ id: Number(iot_datumId)}))
  } : { deleteMany: {} },

      }
      
      await prisma.device.update({
        where: { id },
        data,
      })
    } catch (error) {
      console.error('[EDIT ACTION ERROR:', error)
      return { message: error }
    }

    redirect(`/devices/${id}`)
  }

  export async function deletedevice (formData: FormData) {
    const id = formData.get('id') as string;
    try {
      await prisma.device.delete({
        where: { id },
      });
    } catch (error) {
      console.error('DELETE ACTION ERROR:', error);
      return { message: 'Unable to delete device' };
    }

    revalidatePath(`/devices`)
  }
  