import { useState, useEffect, FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { useAppSelector } from '@app/hooks';
import useAuth from '@hooks/useAuth';
import FormContainer from '../components/FormContainer';
import Loader from '../components/Loader';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const { userInfo } = useAppSelector((state) => state.auth);

  console.log('userInfo from store: ', userInfo);

  const { handleLogin, isLoginLoding } = useAuth();

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
          disabled={isLoginLoding}
        >
          Sign In
        </Button>

        {isLoginLoding && <Loader />}
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
