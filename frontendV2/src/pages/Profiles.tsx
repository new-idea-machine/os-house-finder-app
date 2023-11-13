import { useState } from 'react';
import AddNewProfile from '@components/NewProfile/AddNewProfile';
import { ProfileFormValues } from '@constants/types';
import { RiDeleteBinLine } from 'react-icons/ri';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown';
import { Button } from '@components/ui/button';
import AddNewProperty from '@components/NewProfile/AddNewProperty';
import {
  ExternalLink,
  Eye,
  FileImage,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import { Card, CardContent } from '@components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type PropertyDataType = {
  address: string;
  score: number;
  vfm: number;
};

export type ProfileTabType = ProfileFormValues & {
  value: string;
};

export const columns: ColumnDef<PropertyDataType>[] = [
  {
    accessorKey: 'address',
    header: () => {
      return <div className="font-bold text-black">Address</div>;
    },
    cell: ({ row }) => (
      <div className="break-all text-center">{row.original.address}</div>
    ),
  },
  {
    accessorKey: 'score',
    header: () => {
      return <div className="font-bold text-black">Score</div>;
    },
  },
  {
    accessorKey: 'vfm',
    header: () => {
      return <div className="font-bold text-black">VFM</div>;
    },
  },
  {
    id: 'actions',
    cell: () => {
      return (
        <div className="flex w-full justify-end">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem>Link to Listing</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-500">
                Delete Row
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];

const mockHouseTableData: PropertyDataType[] = [
  {
    address: '485 Broadway',
    score: 78,
    vfm: 0,
  },

  {
    address: '486 Broadway',
    score: 46,
    vfm: 3,
  },

  {
    address: '487 Broadway',
    score: 98,
    vfm: 1,
  },

  {
    address: '487 Broadway',
    score: 98,
    vfm: 1,
  },
];

export default function Profiles() {
  const [properties, setProperties] =
    useState<PropertyDataType[]>(mockHouseTableData);

  const [tabs, setTabs] = useState<ProfileTabType[]>([
    {
      profileName: 'Profile 1',
      value: 'profile1',
      squareFootageWeight: 0,
      squareFootageMin: 0,
      squareFootageMax: 0,
      bedroomWeight: 0,
      bedroomAmount: 0,
      travelRequirementWeight: 0,
      travelRequirementMin: 0,
      travelRequirementMax: 0,
    },
    {
      profileName: 'Profile 2',
      value: 'profile2',
      squareFootageWeight: 0,
      squareFootageMin: 0,
      squareFootageMax: 0,
      bedroomWeight: 0,
      bedroomAmount: 0,
      travelRequirementWeight: 0,
      travelRequirementMin: 0,
      travelRequirementMax: 0,
    },
    {
      profileName: 'Profile 3',
      value: 'profile3',
      squareFootageWeight: 0,
      squareFootageMin: 0,
      squareFootageMax: 0,
      bedroomWeight: 0,
      bedroomAmount: 0,
      travelRequirementWeight: 0,
      travelRequirementMin: 0,
      travelRequirementMax: 0,
    },
    {
      profileName: 'Profile 4',
      value: 'profile4',
      squareFootageWeight: 0,
      squareFootageMin: 0,
      squareFootageMax: 0,
      bedroomWeight: 0,
      bedroomAmount: 0,
      travelRequirementWeight: 0,
      travelRequirementMin: 0,
      travelRequirementMax: 0,
    },
    {
      profileName: 'Profile 5',
      value: 'profile5',
      squareFootageWeight: 0,
      squareFootageMin: 0,
      squareFootageMax: 0,
      bedroomWeight: 0,
      bedroomAmount: 0,
      travelRequirementWeight: 0,
      travelRequirementMin: 0,
      travelRequirementMax: 0,
    },
  ]);

  const defaultTab = {
    profileName: '',
    value: '',
    squareFootageWeight: 0,
    squareFootageMin: 0,
    squareFootageMax: 0,
    bedroomWeight: 0,
    bedroomAmount: 0,
    travelRequirementWeight: 0,
    travelRequirementMin: 0,
    travelRequirementMax: 0,
  };

  const table = useReactTable({
    data: properties,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Tabs
      defaultValue={tabs[0].value}
      className="flex h-full max-w-none animate-in animate-out"
    >
      <TabsList className="flex h-full min-h-[85vh] w-1/4 flex-col justify-between rounded-none border-r-2 border-primary bg-white">
        <section className="mt-8 flex w-full flex-col space-y-3">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="mx-4 justify-start bg-white py-2 text-xl text-primary hover:scale-95 data-[state=active]:bg-primary data-[state=active]:text-white"
            >
              {tab.profileName}
            </TabsTrigger>
          ))}
        </section>
        <AddNewProfile
          currentTabs={tabs}
          addTab={setTabs}
          defualtTab={defaultTab}
        />
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent key={tab.value} value={tab.value} className="w-3/4 px-4">
          <div className="flex flex-col gap-y-8">
            <div className="flex justify-between space-y-3">
              <div className="space-y-3">
                <h3 className="text-3xl font-bold text-gray-400">
                  {tab.profileName}
                </h3>
                <p className="font-semibold text-gray-400">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt{' '}
                </p>
              </div>
              <div className="ml-auto flex gap-5">
                <AddNewProfile
                  currentTabs={tabs}
                  addTab={setTabs}
                  defualtTab={tab}
                />
                <Button
                  variant="destructive"
                  size="icon"
                  className="mr-4 rounded-full"
                  onClick={() => {
                    setTabs(tabs.filter((t) => t.value !== tab.value));
                  }}
                >
                  <RiDeleteBinLine size="1.4rem" />
                </Button>
              </div>
            </div>
            <AddNewProperty
              currentProperties={properties}
              addProperty={setProperties}
            />
            <div>
              <Card className="rounded-none border-black bg-gray-100 shadow-none">
                <CardContent className="flex justify-between py-2">
                  <div className="flex space-x-5">
                    <div className="flex h-16 w-20 items-center justify-center border-4 border-gray-400 bg-white">
                      <FileImage className="text-gray-500" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <p className="font-semibold text-black">180 Cedar</p>
                      <p className="font-semibold text-black">
                        St.Gloucester, ON, K1B 2P4
                      </p>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="flex flex-col">
                        <p className="font-bold text-black">House Score:</p>
                        <p className="font-bold text-black">House VFM:</p>
                      </div>
                      <div className="flex flex-col">
                        <p className="font-bold text-black">78</p>
                        <p className="font-bold text-black">10</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end space-x-2">
                    <Button size="icon" className="rounded-full bg-gray-500">
                      <Eye className="h-5 w-5" />
                    </Button>
                    <Button size="icon" className="rounded-full bg-gray-500">
                      <ExternalLink className="h-5 w-5" />
                    </Button>
                    <Button size="icon" className="rounded-full bg-destructive">
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
            <p className="font-bold text-gray-400">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt
            </p>
            <div className="relative w-full overflow-auto rounded-lg border-2 border-primary">
              <Table>
                <TableHeader className="border-b-2 bg-gray-300 bg-opacity-20">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow
                      key={headerGroup.id}
                      className="data-[state=selected]:bg-gray-300"
                    >
                      {headerGroup.headers.map((header) => {
                        return (
                          <TableHead key={header.id}>
                            {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                                )}
                          </TableHead>
                        );
                      })}
                    </TableRow>
                  ))}
                </TableHeader>
                <TableBody>
                  {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                      <TableRow
                        key={row.id}
                        data-state={row.getIsSelected() && 'selected'}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <TableCell key={cell.id}>
                            <div className="flex">
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </div>
                          </TableCell>
                        ))}
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        className="h-24 text-center"
                      >
                        No results.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}
