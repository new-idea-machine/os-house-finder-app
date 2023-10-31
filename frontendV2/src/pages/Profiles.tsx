import { useState } from 'react';
import AddNewProfile from '@components/NewProfile/AddNewProfile';

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
import { MoreHorizontal } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type ProfileTableDataType = {
  address: string;
  score: number;
  vfm: number;
};

export const columns: ColumnDef<ProfileTableDataType>[] = [
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

const mockHouseTableData: ProfileTableDataType[] = [
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
  const [tabs, setTabs] = useState([
    { name: 'Profile 1', value: 'profile1' },
    { name: 'Profile 2', value: 'profile2' },
    { name: 'Profile 3', value: 'profile3' },
    { name: 'Profile 4', value: 'profile4' },
    { name: 'Profile 5', value: 'profile5' },
  ]);
  const table = useReactTable({
    data: mockHouseTableData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <Tabs
      defaultValue="profile1"
      className="flex h-full max-w-none px-9 animate-in animate-out"
    >
      <TabsList
        className="flex h-full min-h-[85vh] flex-col justify-between rounded-none border-r-2
      border-primary bg-white"
      >
        <section className="mt-8 flex w-full flex-col space-y-4">
          <h2 className="mx-4 text-2xl font-bold">Profiles</h2>
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="mx-4 bg-primary text-xl text-white data-[state=active]:bg-secondary data-[state=active]:text-white"
            >
              {tab.name}
            </TabsTrigger>
          ))}
        </section>
        <AddNewProfile currentTabs={tabs} addTab={setTabs} />
      </TabsList>
      {tabs.map((tab) => (
        <TabsContent
          key={tab.value}
          value={tab.value}
          className="container w-full pt-4"
        >
          <div className="container flex flex-col gap-y-8 px-16 pt-16">
            <div className="flex h-16 w-full items-center rounded-2xl bg-gray-200 px-4">
              <p className="font-bold">House score list (With introduction)</p>
            </div>
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
