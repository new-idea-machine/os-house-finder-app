import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { FiEdit } from 'react-icons/fi';
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
  defualtTab: ProfileTabType;
  addTab: React.Dispatch<ProfileTabType[]>;
};

function AddNewProfile({
  currentTabs,
  addTab,
  defualtTab,
}: AddNewProfileProps) {
  // const [isInputDuplicated, setisInputDuplicated] = useState(false);

  const form = useForm<z.infer<typeof profileFormSchema>>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      profileName: defualtTab.profileName,
      squareFootageWeight: defualtTab.squareFootageWeight,
      squareFootageMin: defualtTab.squareFootageMin,
      squareFootageMax: defualtTab.squareFootageMax,
      bedroomWeight: defualtTab.bedroomWeight,
      bedroomAmount: defualtTab.bedroomAmount,
      travelRequirementWeight: defualtTab.travelRequirementWeight,
      travelRequirementMin: defualtTab.travelRequirementMin,
      travelRequirementMax: defualtTab.travelRequirementMax,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof profileFormSchema>) {
    // console.log('current tabs: ', currentTabs);

    // obtains an array of current existing profile names
    // const profileNamesArray = currentTabs.map((tab) => tab.profileName);

    // if (profileNamesArray.includes(values.profileName)) {
    //   console.log('Profile Name Already Exists!');
    //   // form.setError('profileName', {
    //   //   type: 'manual',
    //   //   message: 'Profile Name Already Exists!',
    //   // });
    //   setisInputDuplicated(true);
    //   console.log('IsInputDuplicated: ', isInputDuplicated);
    // } else {
    // setisInputDuplicated(false);

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

    let newTabs: ProfileTabType[] = [];

    // if tab value is empty string, then new created tab will the be last element of all tabs
    // if tab value is not empty string, then tabs should be renewed
    if (defualtTab.value === '') {
      newTabs = [...currentTabs, newTab];
    } else {
      newTabs = currentTabs.map((tab) => {
        return tab.value === defualtTab.value ? newTab : tab;
      });
    }
    addTab(newTabs);

    // resets all input fields to the beginning
    form.reset({
      profileName: defualtTab.profileName,
      squareFootageWeight: defualtTab.squareFootageWeight,
      squareFootageMin: defualtTab.squareFootageMin,
      squareFootageMax: defualtTab.squareFootageMax,
      bedroomWeight: defualtTab.bedroomWeight,
      bedroomAmount: defualtTab.bedroomAmount,
      travelRequirementWeight: defualtTab.travelRequirementWeight,
      travelRequirementMin: defualtTab.travelRequirementMin,
      travelRequirementMax: defualtTab.travelRequirementMax,
    });
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {defualtTab.profileName === '' ? (
          <Button className="mx-9 w-[88%] text-xs hover:text-stone-600 md:text-sm lg:text-base">
            + Add New Profile
          </Button>
        ) : (
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full bg-primary"
          >
            <FiEdit size="1.2rem" className="text-white" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="p-0">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="h-[35rem] w-full overflow-auto no-scrollbar"
          >
            <DialogHeader className="sticky top-0  m-0 w-full rounded-t-lg border-b-2 bg-secondary p-5">
              <DialogTitle>New Profile</DialogTitle>
            </DialogHeader>
            <div className="mt-0 flex flex-col space-y-8 rounded-md bg-secondary p-10">
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
                        // onChange={(event) => {
                        //   field.onChange(event.target.value);
                        //   setisInputDuplicated(() => {
                        //     if (
                        //       currentTabs
                        //         .map((tab) => tab.profileName)
                        //         .includes(event.target.value)
                        //     ) {
                        //       console.log('#1: ', true);
                        //       return true;
                        //     }
                        //     console.log('#1: ', false);
                        //     return false;
                        //   });
                        //   console.log(
                        //     '#2 event.target.value: ',
                        //     event.target.value
                        //   );
                        // }}
                      />
                    </FormControl>
                    {form.formState.errors.profileName && (
                      <FormMessage>
                        {form.formState.errors.profileName.message}
                      </FormMessage>
                    )}
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
            </div>
            {/* Form Buttons */}
            <DialogFooter className="sticky bottom-0">
              <div className="sticky bottom-0 flex w-full flex-row justify-end rounded-b-lg border-t-2 bg-secondary  p-3">
                <DialogClose asChild>
                  <Button
                    className="w-24 bg-primary text-sm hover:text-stone-600"
                    type="submit"
                    onClick={(e) => {
                      const profileNameTest = currentTabs
                        .map((tab) => tab.profileName)
                        .includes(form.getValues('profileName'));

                      if (profileNameTest) {
                        form.setError('profileName', {
                          type: 'manual',
                          message: 'Profile Name Already Exists!',
                        });
                        // form.trigger();
                        e.preventDefault();
                      } else if (!form.formState.isValid) {
                        form.trigger();

                        if (profileNameTest) {
                          form.setError('profileName', {
                            type: 'manual',
                            message: 'Profile Name Already Exists!',
                          });
                          // form.trigger();
                          e.preventDefault();
                        } else if (!form.formState.isValid) {
                          form.trigger();
                          e.preventDefault();
                        }
                      }
                    }}
                  >
                    ADD
                  </Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button className="ml-3 w-24 bg-[#cccccc] text-sm hover:text-stone-600">
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
