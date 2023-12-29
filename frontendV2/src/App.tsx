import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ContextWrapper from './ContextWrapper';
import Router from './Router';

export default function App() {
  return (
    <ContextWrapper>
      <Router />
      <ToastContainer />
    </ContextWrapper>
  );
}
