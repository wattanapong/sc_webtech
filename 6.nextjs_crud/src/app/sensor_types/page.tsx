
  import { prisma } from '@/lib/prisma';
  import { deletesensor_type } from '@/actions/sensor_type';
  import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';

  export default async function sensor_typesListPage() {
    const sensor_types = await prisma.sensor_type.findMany();

    const breadcrumbs = [
      { name: 'Dashboard', href: '/' },
      { name: 'sensor_types', href: '#' }
    ]

    return (
      <>
        <Breadcrumbs elements={breadcrumbs} className="my-2" />

        <header className="flex justify-between mb-4">
          <Heading>All sensor_types</Heading>
          <Button
            as="a"
            href="/sensor_types/create"
            className="font-medium"
          >
           New sensor_type
          </Button>
        </header>

        <section className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        Sensor_type_id
      </th><th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        Type_name
      </th><th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        Unit
      </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sensor_types.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 py-4">
                    No sensor_types found
                  </td>
                </tr>
              )}

              {sensor_types.map((sensor_type) => (
                <tr key={sensor_type.id}>
                  <td className="px-4 py-2 text-gray-700">
          {sensor_type.sensor_type_id}
        </td>
        <td className="px-4 py-2 text-gray-700">
          {sensor_type.type_name}
        </td>
        <td className="px-4 py-2 text-gray-700">
          {sensor_type.unit}
        </td>
        
                  <td className="px-4 py-2">
                    <div className="flex gap-x-1 h-full justify-center">
                      <Button
                        as="a"
                        href={`/sensor_types/${sensor_type.id}`}
                        variant="ghost"
                        size="sm"
                        className="font-medium"
                      >
                        Show
                      </Button>
                      <Button
                        as="a"
                        href={`/sensor_types/${sensor_type.id}/edit`}
                        variant="ghost"
                        size="sm"
                        className="font-medium"
                      >
                        Edit
                      </Button>
                      <form action={deletesensor_type} className="inline-block">
                        <input type="hidden" name="id" value={sensor_type.id} />
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
  