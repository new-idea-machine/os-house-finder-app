import { Container } from 'react-bootstrap';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@components/Header/Header';
import Footer from '@components/Footer';
import ContextWrapper from './ContextWrapper';
import Router from './Router';

function App() {
  return (
    <ContextWrapper>
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
