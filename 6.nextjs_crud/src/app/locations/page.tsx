
  import { prisma } from '@/lib/prisma';
  import { deletelocation } from '@/actions/location';
  import { Breadcrumbs } from '@/components/ui/Breadcrumbs';
  import { Heading } from '@/components/ui/Heading';
  import { Button } from '@/components/ui/Button';

  export default async function locationsListPage() {
    const locations = await prisma.location.findMany();

    const breadcrumbs = [
      { name: 'Dashboard', href: '/' },
      { name: 'locations', href: '#' }
    ]

    return (
      <>
        <Breadcrumbs elements={breadcrumbs} className="my-2" />

        <header className="flex justify-between mb-4">
          <Heading>All locations</Heading>
          <Button
            as="a"
            href="/locations/create"
            className="font-medium"
          >
           New location
          </Button>
        </header>

        <section className="overflow-x-auto">
          <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
            <thead className="text-left">
              <tr>
                <th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        Location_id
      </th><th className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
        Location_name
      </th>
                <th className="px-4 py-2"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {locations.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center text-gray-500 py-4">
                    No locations found
                  </td>
                </tr>
              )}

              {locations.map((location) => (
                <tr key={location.id}>
                  <td className="px-4 py-2 text-gray-700">
          {location.location_id}
        </td>
        <td className="px-4 py-2 text-gray-700">
          {location.location_name}
        </td>
        
                  <td className="px-4 py-2">
                    <div className="flex gap-x-1 h-full justify-center">
                      <Button
                        as="a"
                        href={`/locations/${location.id}`}
                        variant="ghost"
                        size="sm"
                        className="font-medium"
                      >
                        Show
                      </Button>
                      <Button
                        as="a"
                        href={`/locations/${location.id}/edit`}
                        variant="ghost"
                        size="sm"
                        className="font-medium"
                      >
                        Edit
                      </Button>
                      <form action={deletelocation} className="inline-block">
                        <input type="hidden" name="id" value={location.id} />
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
  