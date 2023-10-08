import { useEffect } from 'react';
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
  FormDescription,
} from '@components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Input } from '@components/ui/input';
import { Button } from '@components/ui/button';

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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Please Enter Your Email.
"
                  {...field}
                />
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
                <Input placeholder="Please Enter Your Password." {...field} />
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
                <Input placeholder="Password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          {isLoginLoading ? (
            <>
              <svg className="mr-3 h-5 w-5 animate-spin" viewBox="0 0 24 24">
                {' '}
              </svg>
              Loading...
            </>
          ) : (
            'Submit'
          )}
        </Button>
      </form>
      <div className="mx-auto my-4 flex w-full items-center justify-evenly before:mr-4 before:block before:h-px before:flex-grow before:bg-stone-400 after:ml-4 after:block after:h-px after:flex-grow after:bg-stone-400">
        or
      </div>
      <p className="mt-2 text-center text-sm text-gray-600">
        If you don&apos;t have an account, please&nbsp;
        <Link
          to="/register"
          className="rounded-md border p-2 font-bold text-gray-800 hover:bg-gray-100 hover:underline"
        >
          Register
        </Link>
      </p>
    </Form>

    // <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 py-6 sm:px-6 lg:px-8">
    //   <div className="w-full max-w-md space-y-8">login</div>
    // </div>
    // <FormContainer>
    //   <h1>Sign In</h1>
    //   <Form onSubmit={submitHandler}>
    //     <Form.Group controlId="email" className="my-3">
    //       <Form.Control
    //         type="email"
    //         placeholder="Enter email"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //     </Form.Group>

    //     <Form.Group controlId="password" className="my-3">
    //       <Form.Control
    //         type="password"
    //         placeholder="Enter password"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //     </Form.Group>

    //     <Button
    //       type="submit"
    //       variant="primary"
    //       className="mt-3"
    //       disabled={isLoginLoading}
    //     >
    //       Sign In
    //     </Button>

    //     {isLoginLoading && <Loader />}
    //   </Form>
    //   <Row className="py-3">
    //     <Col>
    //       New Customer?{' '}
    //       <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
    //         Register
    //       </Link>
    //     </Col>
    //   </Row>
    // </FormContainer>
  );
}

export default LoginScreen;
