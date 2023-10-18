import { useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAppSelector } from '@app/hooks';
import useAuth from '@hooks/useAuth';
import FormContainer from '@components/FormContainer';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from '@components/ui/dialog';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import GoogleLoginButton from '@components/GoogleLoginButton';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { PasswordShowContext } from '@/context/PasswordShowProvider';

const loginFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(4, {
      message: 'Email must be at least 4 characters long',
    })
    .max(85, {
      message: 'Email must be at most 85 characters long',
    }),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(85, {
      message: 'Password must be at most 85 characters long',
    }),
});

function LoginScreen() {
  const navigate = useNavigate();

  const { userInfo } = useAppSelector((state) => state.auth);

  const { handleLogin, isLoginLoading } = useAuth();

  const { isPasswordShow, setIsPasswordShow } = useContext(PasswordShowContext);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    handleLogin(values);
    // axiosLogin(values);
  }

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Please Enter Your Email." {...field} />
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
                <div className="relative">
                  <Input
                    type={isPasswordShow ? 'text' : 'password'}
                    placeholder="Please Enter Your Password."
                    {...field}
                    className="pr-10"
                  />
                  <Button
                    className="absolute right-2 top-1/2 -translate-y-1/2 transform text-gray-500 hover:text-gray-700"
                    variant="link"
                    type="button"
                    onClick={() => setIsPasswordShow(!isPasswordShow)}
                  >
                    {isPasswordShow ? <AiFillEyeInvisible /> : <AiFillEye />}
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <Button type="submit" variant="default">
            {isLoginLoading ? (
              <>
                <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                  {' '}
                </svg>
                Loading
              </>
            ) : (
              'Submit'
            )}
          </Button>
          <Button variant="link">
            <Link
              to="/forgot-password"
              className=" rounded-md p-2 font-bold hover:bg-gray-100 hover:underline"
            >
              Forgot Password?
            </Link>
          </Button>
        </div>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <GoogleLoginButton>
        <FcGoogle />
        Login with Google
      </GoogleLoginButton>
      <p className="mt-4 text-center text-sm text-gray-600">
        If you don&apos;t have an account, please&nbsp;
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="link"
              className="rounded-md p-2 font-bold hover:bg-gray-100 hover:underline"
            >
              Register
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-sm sm:max-w-[425px] lg:max-w-lg xl:max-w-2xl">
            <DialogHeader>
              <DialogTitle>Register</DialogTitle>
              <DialogDescription>
                Please register with email and password to continue.
              </DialogDescription>
            </DialogHeader>

            <FormContainer>
              <FormContainer.RegisterScreen />
            </FormContainer>
          </DialogContent>
        </Dialog>
      </p>
    </Form>
  );
}

export default LoginScreen;
