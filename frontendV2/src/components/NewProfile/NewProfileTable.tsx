import { Button } from '@components/ui/button';
import { Label } from '@components/ui/label';
import { Input } from '@components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

type TableDataType = {
  variable: string;
  weight: number;
};

const tableData: TableDataType[] = [
  {
    variable: 'Square Footage',
    weight: 1,
  },
  {
    variable: 'Bedrooms',
    weight: 1,
  },
  {
    variable: 'Travel Requirements',
    weight: 1,
  },
  {
    variable: 'Variable #4',
    weight: 1,
  },
];

export default function NewProfileTable() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Test New Profile Table</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>New Profile</DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-4">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="New profile name"
            className="col-span-3"
          />
        </div>

        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Variable</TableHead>
              <TableHead>Weight</TableHead>
              <TableHead>Something else?</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((entry) => {
              return (
                <TableRow>
                  <TableCell className="font-medium">
                    {entry.variable}
                  </TableCell>
                  <TableCell>{entry.weight}</TableCell>
                  <TableCell />
                </TableRow>
              );
            })}
          </TableBody>
        </Table>

        <DialogFooter className="gap-y-2 md:flex">
          <Button type="submit">ADD</Button>
          <Button type="button">CLOSE</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
