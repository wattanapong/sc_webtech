
  import { prisma } from '@/lib/prisma';
  import { deletedevice } from '@/actions/device';
  import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';

  export default async function devicesListPage() {
    const devices = await prisma.device.findMany();

    const breadcrumbs = [
      { name: 'Dashboard', href: '/' },
      { name: 'devices', href: '#' }
    ]

    return (
      <>
        <Breadcrumbs elements={breadcrumbs} className="my-2" />

        <header className="flex justify-between mb-4">
          <Heading>All devices</Heading>
          <Button
            as="a"
            href="/devices/create"
            className="font-medium"
          >
           New device
          </Button>
        </header>

        <section className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        Device_id
      </th><th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        Device_name
      </th><th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        Manufacture_id
      </th><th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        Sensor_type_id
      </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {devices.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-4">
                    No devices found
                  </td>
                </tr>
              )}

              {devices.map((device) => (
                <tr key={device.id}>
                  <td className="px-4 py-2 text-gray-700">
          {device.device_id}
        </td>
        <td className="px-4 py-2 text-gray-700">
          {device.device_name}
        </td>
        <td className="px-4 py-2 text-gray-700">
          {device.manufacture_id}
        </td>
        <td className="px-4 py-2 text-gray-700">
          {device.sensor_type_id}
        </td>
        
                  <td className="px-4 py-2">
                    <div className="flex gap-x-1 h-full justify-center">
                      <Button
                        as="a"
                        href={`/devices/${device.id}`}
                        variant="ghost"
                        size="sm"
                        className="font-medium"
                      >
                        Show
                      </Button>
                      <Button
                        as="a"
                        href={`/devices/${device.id}/edit`}
                        variant="ghost"
                        size="sm"
                        className="font-medium"
                      >
                        Edit
                      </Button>
                      <form action={deletedevice} className="inline-block">
                        <input type="hidden" name="id" value={device.id} />
                        <Button
                          type="submit"
                          variant="ghost"
                          size="sm"
                          className="font-medium text-red-600 hover:bg-red-100 disabled:bg-red-100"
                        >
                          Delete
                        </Button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </>
    )
  }
  