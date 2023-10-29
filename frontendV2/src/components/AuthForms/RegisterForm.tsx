import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormRootErrorMessage,
} from '@components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import { useContext } from 'react';
import { Checkbox } from '@components/ui/checkbox';
import useAuth from '@hooks/useAuth';
import { PasswordShowContext } from '@/context/PasswordShowProvider';

const registerFormSchema = z
  .object({
    email: z.string().email({
      message: 'You must enter a valid email.',
    }),
    password: z
      .string()
      .min(6, {
        message: `Your password isn't long enough.`,
      })
      .max(24, {
        message: `Your password is to long.`,
      }),
    passwordConfirmation: z
      .string()
      .min(6, {
        message: `Your password isn't long enough.`,
      })
      .max(24, {
        message: `Your password is to long.`,
      }),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ['passwordConfirmation'],
  });

type RegisterSchemaType = z.infer<typeof registerFormSchema>;

export default function RegisterForm() {
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { handleRegister, registerResult } = useAuth();
  const {
    isPasswordShow,
    setIsPasswordShow,
    isConfirmPasswordShow,
    setIsConfirmPasswordShow,
  } = useContext(PasswordShowContext);

  async function onSubmit(values: RegisterSchemaType) {
    handleRegister(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Password"
                  type={isPasswordShow ? 'text' : 'password'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <div className="flex items-center gap-x-1">
                Show Password
                <Checkbox onClick={() => setIsPasswordShow(!isPasswordShow)} />
              </div>
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passwordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Confirm Password"
                  type={isConfirmPasswordShow ? 'text' : 'password'}
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <div className="flex items-center gap-x-1">
                Show Password
                <Checkbox
                  onClick={() =>
                    setIsConfirmPasswordShow(!isConfirmPasswordShow)
                  }
                />
              </div>
            </FormItem>
          )}
        />

        <FormRootErrorMessage errors={form.formState.errors} />

        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting || registerResult.isLoading}
            className="bg-slate-800"
          >
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
}
