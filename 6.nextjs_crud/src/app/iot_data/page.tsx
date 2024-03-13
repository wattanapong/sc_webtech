
  import { prisma } from '@/lib/prisma';
  import { deleteiot_data } from '@/actions/iot_data';
  import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';

  export default async function iot_dataListPage() {
    const iot_data = await prisma.iot_data.findMany();

    const breadcrumbs = [
      { name: 'Dashboard', href: '/' },
      { name: 'iot_data', href: '#' }
    ]

    return (
      <>
        <Breadcrumbs elements={breadcrumbs} className="my-2" />

        <header className="flex justify-between mb-4">
          <Heading>All iot_data</Heading>
          <Button
            as="a"
            href="/iot_data/create"
            className="font-medium"
          >
           New iot_data
          </Button>
        </header>

        <section className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        Timestamp
      </th><th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        Value
      </th><th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        Device_id
      </th><th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        Location_id
      </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {iot_data.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-4">
                    No iot_data found
                  </td>
                </tr>
              )}

              {iot_data.map((iot_data) => (
                <tr key={iot_data.id}>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
            {new Date(iot_data.timestamp).toLocaleString()}
          </td>
          <td className="px-4 py-2 text-gray-700">
          {iot_data.value}
        </td>
        <td className="px-4 py-2 text-gray-700">
          {iot_data.device_id}
        </td>
        <td className="px-4 py-2 text-gray-700">
          {iot_data.location_id}
        </td>
        
                  <td className="px-4 py-2">
                    <div className="flex gap-x-1 h-full justify-center">
                      <Button
                        as="a"
                        href={`/iot_data/${iot_data.id}`}
                        variant="ghost"
                        size="sm"
                        className="font-medium"
                      >
                        Show
                      </Button>
                      <Button
                        as="a"
                        href={`/iot_data/${iot_data.id}/edit`}
                        variant="ghost"
                        size="sm"
                        className="font-medium"
                      >
                        Edit
                      </Button>
                      <form action={deleteiot_data} className="inline-block">
                        <input type="hidden" name="id" value={iot_data.id} />
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
  