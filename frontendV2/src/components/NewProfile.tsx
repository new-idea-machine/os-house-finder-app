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
import { Slider } from '@/components/ui/slider';

const formSchema = z.object({
  profileName: z
    .string()
    .min(1, {
      message: 'Profile name must be at least 1 character.',
    })
    .max(100, {
      message: 'Profile name must be at most 100 character.',
    }),
  squareFootageWeight: z // Square Footage Input
    .number()
    .min(1, {
      message: 'Weight must be at least 1.',
    })
    .max(100, {
      message: 'Weight must be at most 100.',
    })
    .default(0),
  squareFootageMin: z
    .number()
    .min(1, {
      message: 'Weight must be at least 1.',
    })
    .max(100, {
      message: 'Weight must be at most 100.',
    }),
  squareFootageMax: z
    .number()
    .min(1, {
      message: 'Weight must be at least 1.',
    })
    .max(100, {
      message: 'Weight must be at most 100.',
    }),
  bedroomWeight: z // Bedroom Input
    .number()
    .min(1, {
      message: 'Weight must be at least 1.',
    })
    .max(100, {
      message: 'Weight must be at most 100.',
    })
    .default(0),
  bedroomAmount: z
    .number()
    .min(1, {
      message: 'Weight must be at least 1.',
    })
    .max(100, {
      message: 'Weight must be at most 100.',
    })
    .default(0),
  travelRequirementWeight: z // Travel Requirement Input
    .number()
    .min(1, {
      message: 'Weight must be at least 1.',
    })
    .max(100, {
      message: 'Weight must be at most 100.',
    })
    .default(0),
  travelRequirementMin: z
    .number()
    .min(1, {
      message: 'Weight must be at least 1.',
    })
    .max(100, {
      message: 'Weight must be at most 100.',
    }),
  travelRequirementMax: z
    .number()
    .min(1, {
      message: 'Weight must be at least 1.',
    })
    .max(100, {
      message: 'Weight must be at most 100.',
    }),
});

function NewProfile() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
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
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    // eslint-disable-next-line no-console
    console.log(values);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="h-[35rem] w-6/12 overflow-auto "
      >
        <div className="sticky top-0  m-0 w-full rounded-t-lg bg-[#dcdcdc] p-5">
          <h3 className="text-sm font-bold">New Profile</h3>
        </div>
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
              nulla voluptates quia magni minus animi earum in magnam doloremque
              molestiae fuga id dolor unde ducimus vitae quo enim. Atque
              mollitia minima eligendi debitis consequuntur omnis eius, sequi
              doloremque ea magnam. Quia, itaque!
            </p>
          </div>
          <hr className="bg-black" />

          {/*Square Footage Input */}

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
                    onChange={(event) => field.onChange(+event.target.value)}
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
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <hr className="bg-black" />

          {/*Bedroom Input */}

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
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <hr className="bg-black" />

          {/*Travel Requirements Input */}

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
                    onChange={(event) => field.onChange(+event.target.value)}
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
                    onChange={(event) => field.onChange(+event.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <hr className="bg-black" />
        </div>

        {/* Form Buttons */}
        <div className="sticky bottom-0 flex w-full flex-row justify-end rounded-b-lg bg-[#dcdcdc]  p-3">
          <Button className="w-24 bg-[#cccccc] text-sm" type="submit">
            ADD
          </Button>
          <Button className="ml-3 w-24 bg-[#cccccc] text-sm">CLOSE</Button>
        </div>
      </form>
    </Form>
  );
}

export default NewProfile;
