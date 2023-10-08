import { useState, useEffect, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import * as z from 'zod';
// import { Button, Form, Row, Col } from 'react-bootstrap';
import { useAppSelector } from '@app/hooks';
import useAuth from '@hooks/useAuth';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

const loginFormSchema = z.object({
  email: z
    .string()
    .email()
    .min(4, {
      message: 'Email must be at least 4 characters long',
    })
    .max(255),
  password: z
    .string()
    .min(8, {
      message: 'Password must be at least 8 characters long',
    })
    .max(125, {
      message: 'Password must be at most 125 characters long',
    }),
});

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const submitHandler = async (e: FormEvent) => {
    e.preventDefault();
    handleLogin({ email, password });
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="email" className="my-3">
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="password" className="my-3">
          <Form.Control
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button
          type="submit"
          variant="primary"
          className="mt-3"
          disabled={isLoginLoading}
        >
          Sign In
        </Button>

        {isLoginLoading && <Loader />}
      </Form>
      <Row className="py-3">
        <Col>
          New Customer?{' '}
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
}

export default LoginScreen;
