import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '@components/Header/Header';
import Footer from '@components/Footer';
import ContextWrapper from './ContextWrapper';
import Router from './Router';

export default function App() {
  return (
    <ContextWrapper>
      <Header />
      <main className="py-3">
        <div className="container">
          <Router />
        </div>
      </main>
      <Footer />
      <ToastContainer />
    </ContextWrapper>
  );
}
