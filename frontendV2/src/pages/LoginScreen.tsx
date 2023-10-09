import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAppSelector } from '@app/hooks';
import useAuth from '@hooks/useAuth';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@components/ui/form';
import FormContainer from '@components/FormContainer';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';
import GoogleLoginButton from '@components/GoogleLoginButton';
import { FcGoogle } from 'react-icons/fc';
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

  console.log('isPasswordShow', isPasswordShow);
  console.log('setIsPasswordShow', setIsPasswordShow);

  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get('redirect') || '/';

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [userInfo, redirect, navigate]);

  function onSubmit(values: z.infer<typeof loginFormSchema>) {
    console.log(values);
    handleLogin(values);
  }

  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  return (
    <>
      <button
        type="button"
        onClick={() => setIsPasswordShow((preV: boolean) => !preV)}
      >
        {isPasswordShow ? 'Hide' : 'Show'}
      </button>
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
                  <>
                    <Input
                      type={isPasswordShow ? 'text' : 'password'}
                      placeholder="Please Enter Your Password."
                      {...field}
                    />
                    {/* <Button
                      variant="link"
                      onClick={() => setIsPasswordShow(true)}
                    >
                      {isPasswordShow ? 'Hide' : 'Show'}
                    </Button> */}
                  </>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button type="submit" variant="default">
              {isLoginLoading ? (
                <>
                  <svg
                    className="mr-3 h-5 w-5 animate-spin"
                    viewBox="0 0 24 24"
                  >
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
          <Button variant="link">
            <Link
              to="/register"
              className="rounded-md p-2 font-bold hover:bg-gray-100 hover:underline"
            >
              Register
            </Link>
          </Button>
        </p>
      </Form>
    </>
  );
}

export default LoginScreen;
