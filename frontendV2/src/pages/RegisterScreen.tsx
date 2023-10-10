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
import { useRegisterMutation } from '@api/auth/authApi';
import { useNavigate } from 'react-router-dom';
import { isErrorWithMessage } from '@utils/IsFetchBaseQueryError';
import { useAppDispatch } from '@app/hooks';
import { setCredentials } from '@features/authSlice';
import { PasswordShowContext } from '@/context/PasswordShowProvider';

const registerFormSchema = z.object({
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
});

type RegisterSchemaType = z.infer<typeof registerFormSchema>;

export default function RegisterScreen() {
  const navigate = useNavigate();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const dispatch = useAppDispatch();
  const [register, registerResult] = useRegisterMutation();
  const { isPasswordShow, setIsPasswordShow } = useContext(PasswordShowContext);

  async function onSubmit(values: RegisterSchemaType) {
    register(values)
      .unwrap()
      .then((registerResponse) => {
        // TODO: Move register logic into useAuth hook?
        dispatch(
          setCredentials({
            id: registerResponse.id,
            email: registerResponse.email,
            role: registerResponse.role,
          })
        );
        localStorage.setItem('token', registerResponse.token);
        navigate('/');
      })
      .catch((error) => {
        // TODO: Move into helper function?
        if (isErrorWithMessage(error)) {
          form.setError('root', {
            message: error.message,
          });
        } else {
          form.setError('root', {
            message:
              'There was an error creating your account. Please try again.',
          });
        }
      });
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
