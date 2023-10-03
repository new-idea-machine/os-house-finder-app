import { Container } from 'react-bootstrap';
import Router from './Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@components/Header/Header.jsx';
import Footer from '@components/Footer';
import ContextWrapper from './ContextWrapper';
import { useState } from 'react';
import './App.css';
import { ReloadIcon } from '@radix-ui/react-icons';

import { Button } from '@components/ui/button';

function App() {
  const [count, setCount] = useState(0);

  return (
    <ContextWrapper>
      <Button
        onClick={() => setCount((prev) => prev + 1)}
        className="flex items-center"
      >
        {' '}
        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        Please wait
      </Button>
      <div>need refactor {count}</div>

      <Header />
      <main className="py-3">
        <Container>
          <Router />
        </Container>
      </main>
      <Footer />
      <ToastContainer />
    </ContextWrapper>
  );
}

export default App;
