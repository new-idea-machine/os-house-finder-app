import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { Button } from '@components/ui/button';
import { Input } from '@components/ui/input';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import { propertyFormSchema } from '@constants/formSchemas';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from '@/components/ui/dialog';

import { Slider } from '@/components/ui/slider';

function AddNewProperty() {
  const [open, setOpen] = useState(false); // use to close dialog after submitting is successful

  const form = useForm<z.infer<typeof propertyFormSchema>>({
    resolver: zodResolver(propertyFormSchema),
    defaultValues: {
      propertyURL: '',
      customVariable: 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof propertyFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // eslint-disable-next-line no-console
    console.log(values);
    console.log('Added new property!');
    setOpen(false); // close dialog after submitting is successful
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className=" w-fit self-end text-xs hover:text-gray-700 md:text-sm lg:text-base">
          + Add Property
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-auto w-full overflow-auto no-scrollbar"
          >
            <DialogHeader className="sticky top-0  m-0 w-full rounded-t-lg bg-[#dcdcdc] p-5">
              <DialogTitle>New Property</DialogTitle>
            </DialogHeader>
            <div className="mt-0 flex flex-col space-y-8 rounded-md bg-[#efefef] px-10 py-5">
              <FormField
                control={form.control}
                name="propertyURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Name</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Profile Name"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div>
                <h3 className="mb-2 font-bold">Instruction Header</h3>
                <p className="text-sm">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
                  labore, possimus ipsa perferendis ea repudiandae omnis debitis
                  nulla voluptates quia magni minus animi earum in magnam
                  doloremque molestiae fuga id dolor unde ducimus vitae quo
                  enim. Atque mollitia minima eligendi debitis consequuntur
                  omnis eius, sequi doloremque ea magnam. Quia, itaque!
                </p>
              </div>
              <hr className="bg-black" />

              {/* Custom Variable Input */}
              <h3 className="mb-2 mt-0 font-bold">Custom Variable #1</h3>
              <FormField
                control={form.control}
                name="customVariable"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Score out of 10</FormLabel>
                    <FormControl>
                      <Input
                        className="bg-white"
                        placeholder="Profile Name"
                        {...field}
                        onChange={(event) =>
                          field.onChange(+event.target.value)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            {/* Form Buttons */}
            <DialogFooter className="sticky bottom-0">
              <div className="sticky bottom-0 flex w-full flex-row justify-end rounded-b-lg bg-[#dcdcdc]  p-3">
                <Button className="w-24 bg-[#cccccc] text-sm" type="submit">
                  ADD
                </Button>
                <DialogClose asChild>
                  <Button className="ml-3 w-24 bg-[#cccccc] text-sm">
                    CLOSE
                  </Button>
                </DialogClose>
              </div>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

export default AddNewProperty;
