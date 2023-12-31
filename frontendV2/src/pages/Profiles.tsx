import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import AddNewProfile from '@components/NewProfile/AddNewProfile';
import { ProfileFormValues } from '@constants/types';
import { RiDeleteBinLine } from 'react-icons/ri';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table';
import useHouse from '@hooks/useHouse';
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
import { useAppSelector } from '@app/hooks';
import { useToast } from '@components/ui/use-toast';
import { fetchHouse } from '@features/houseSlice'; // Import the async thunk you defined
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export type PropertyDataType = {
  address: string;
  score: number;
  vfm: number;
};

export type ProfileTabType = ProfileFormValues & {
  value: string;
};
// eslint-disable-next-line
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

  const { userInfo } = useAppSelector((state) => state.auth);

  const { toast } = useToast();

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

  // const house = useSelector((state) => state.house.value);
  // const house = useAppSelector((state) => state.house.value); // Get the house data from the store
  // console.log('house in Profiles page: ', house);

  // const dispatch = useAppDispatch();

  const { houseData } = useHouse();

  // useEffect(() => {
  //   const houseId = '6535f02e3cf2f28c9fb6a168'; // Replace with the actual ID or a prop
  //   dispatch(fetchHouse(houseId)); // Dispatch the thunk action to fetch house data
  //   console.log('222: ', house);
  // }, [dispatch]);

  // useEffect(() => {
  //   if (house) {
  //     console.log('Fetched house data:', house); // Console log the house data
  //   }
  // }, [house]);

  const [currentTabValue, setCurrentTabValue] = useState<string>(tabs[0].value);

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

  const navigate = useNavigate();

  useEffect(() => {
    if (!userInfo) {
      navigate('/');
      setTimeout(() => {
        toast({
          title: 'Please login first',
          description: `You need to login to access this page`,
          variant: 'destructive',
          duration: 2000,
        });
      }, 800);
    }
    // eslint-disable-next-line
  }, [userInfo]);

  return (
    <Tabs
      defaultValue={tabs[0].value}
      value={currentTabValue}
      className="flex h-full max-w-none animate-in animate-out"
    >
      <TabsList className="flex h-full min-h-[85vh] w-1/4 flex-col justify-between rounded-none border-r-2 border-primary bg-white">
        <section className="mt-8 flex w-full flex-col space-y-3">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              onClick={() => {
                setCurrentTabValue(tab.value);
              }}
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
                    setTabs((prevTabs) => {
                      let deletedIndex = 0;
                      const updatedTabs = prevTabs.filter((t, index) => {
                        if (t.value === tab.value) {
                          deletedIndex = index;
                          return false;
                        }
                        return true;
                      });

                      if (deletedIndex === 0) {
                        setCurrentTabValue(updatedTabs[0].value);
                      } else {
                        setCurrentTabValue(updatedTabs[deletedIndex - 1].value);
                      }

                      return updatedTabs;
                    });
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
                      <p className="font-semibold text-black">
                        {/* {houseData?.data ? houseData.data.address : null} */}
                        {houseData ? houseData.address : null}
                      </p>
                      <p className="font-semibold text-black">
                        {/* City: {house.data.city} */}
                      </p>
                    </div>
                    <div className="flex items-center justify-center space-x-4">
                      <div className="flex flex-col">
                        <p className="font-bold text-black">
                          {/* Price: ${house.data.price} */}
                        </p>
                        <p className="font-bold text-black">
                          {/* Square Footage: {house.data.squareFootage} */}
                        </p>
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
