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
    .min(2, {
      message: 'Profile name must be at least 1 character.',
    })
    .max(100, {
      message: 'Profile name must be at most 100 character.',
    }),
  height: z
    .number()
    .min(1, {
      message: 'Height must be at least 1.',
    })
    .max(100, {
      message: 'Height must be at most 100.',
    })
    .default(0),
  weight: z
    .number()
    .min(1, {
      message: 'Weight must be at least 1.',
    })
    .max(100, {
      message: 'Weight must be at most 100.',
    })
    .default(0),
});

function NewProfile() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      profileName: '',
      height: 0,
      weight: 0,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="h-2/5">
        <div className="m-0 w-6/12 rounded-t-lg bg-[#dcdcdc] p-5">
          <h3 className="text-sm font-bold">New Profile</h3>
        </div>
        <div className="mt-0 flex w-6/12 flex-col space-y-8 rounded-md bg-[#efefef] p-10">
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
          <h3 className="mb-2 font-bold">Square Footage</h3>
          <FormField
            control={form.control}
            name="height"
            render={({ field: { value, onChange } }) => (
              <FormItem>
                <div className="flex flex-row justify-between">
                  <p className="text-sm">Height</p>
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
            name="weight"
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
        </div>

        <div className="flex w-6/12 flex-row justify-end rounded-b-lg bg-[#dcdcdc] p-3">
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
