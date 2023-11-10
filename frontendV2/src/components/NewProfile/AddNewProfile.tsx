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
import { profileFormSchema } from '@constants/formSchemas';
import { ProfileTabType } from '@pages/Profiles';
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

type AddNewProfileProps = {
  currentTabs: ProfileTabType[];
  addTab: React.Dispatch<ProfileTabType[]>;
};

function AddNewProfile({ currentTabs, addTab }: AddNewProfileProps) {
  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      profileName: '',
      squareFootageWeight: 0,
      squareFootageMin: 0,
      squareFootageMax: 0,
      bedroomWeight: 0,
      bedroomAmount: 0,
      travelRequirementWeight: 0,
      travelRequirementMin: 0,
      travelRequirementMax: 0,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    console.log(values);
    const newTab = {
      profileName: values.profileName,
      value: values.profileName.toLowerCase(),
      squareFootageWeight: values.squareFootageWeight,
      squareFootageMin: values.squareFootageMin,
      squareFootageMax: values.squareFootageMax,
      bedroomWeight: values.bedroomWeight,
      bedroomAmount: values.bedroomAmount,
      travelRequirementWeight: values.travelRequirementWeight,
      travelRequirementMin: values.travelRequirementMin,
      travelRequirementMax: values.travelRequirementMax,
    };
    const newTabs = [...currentTabs, newTab];
    addTab(newTabs);
    console.log('Added new tab!');
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mx-9 w-[88%] text-xs md:text-sm lg:text-base">
          + Add New Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-[35rem] w-full overflow-auto no-scrollbar"
          >
            <DialogHeader className="sticky top-0  m-0 w-full rounded-t-lg bg-[#dcdcdc] p-5">
              <DialogTitle>New Profile</DialogTitle>
            </DialogHeader>
            <div className="mt-0 flex flex-col space-y-8 rounded-md bg-[#efefef] p-10">
              <FormField
                control={form.control}
                name="profileName"
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

              {/* Square Footage Input */}

              <h3 className="mb-2 font-bold">Square Footage</h3>
              <FormField
                control={form.control}
                name="squareFootageWeight"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <div className="flex flex-row justify-between">
                      <p className="text-sm">Weight</p>
                      <div className="flex flex-row">
                        <FormControl>
                          <Slider
                            className="mr-5 w-40"
                            min={0}
                            max={100}
                            step={1}
                            defaultValue={[value]}
                            onValueChange={(val) => onChange(val[0])}
                          />
                        </FormControl>
                        <p>{value}</p>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="squareFootageMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Min</FormLabel>
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
              <FormField
                control={form.control}
                name="squareFootageMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Max</FormLabel>
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
              <hr className="bg-black" />

              {/* Bedroom Input */}

              <h3 className="mb-2 font-bold">Bedroom</h3>
              <FormField
                control={form.control}
                name="bedroomWeight"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <div className="flex flex-row justify-between">
                      <p className="text-sm">Weight</p>
                      <div className="flex flex-row">
                        <FormControl>
                          <Slider
                            className="mr-5 w-40"
                            min={0}
                            max={100}
                            step={1}
                            defaultValue={[value]}
                            onValueChange={(val) => onChange(val[0])}
                          />
                        </FormControl>
                        <p>{value}</p>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bedroomAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Amount</FormLabel>
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
              <hr className="bg-black" />

              {/* Travel Requirements Input */}

              <h3 className="mb-2 font-bold">Travel Requirements</h3>
              <FormField
                control={form.control}
                name="travelRequirementWeight"
                render={({ field: { value, onChange } }) => (
                  <FormItem>
                    <div className="flex flex-row justify-between">
                      <p className="text-sm">Weight</p>
                      <div className="flex flex-row">
                        <FormControl>
                          <Slider
                            className="mr-5 w-40"
                            min={0}
                            max={100}
                            step={1}
                            defaultValue={[value]}
                            onValueChange={(val) => onChange(val[0])}
                          />
                        </FormControl>
                        <p>{value}</p>
                      </div>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="travelRequirementMin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Min</FormLabel>
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
              <FormField
                control={form.control}
                name="travelRequirementMax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-bold">Max</FormLabel>
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
              <hr className="bg-black" />
              <FormMessage />
            </div>
            {/* Form Buttons */}
            <DialogFooter className="sticky bottom-0">
              <div className="sticky bottom-0 flex w-full flex-row justify-end rounded-b-lg bg-[#dcdcdc]  p-3">
                <DialogClose asChild>
                  <Button className="w-24 bg-[#cccccc] text-sm" type="submit">
                    ADD
                  </Button>
                </DialogClose>
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

export default AddNewProfile;
