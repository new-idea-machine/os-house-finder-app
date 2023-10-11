import { Route, Routes } from 'react-router-dom';

import DemoScreen from '@pages/DemoScreen';
import FAQScreen from '@pages/FAQScreen';
import HomeScreen from '@pages/HomeScreen';
import FormContainer from '@components/FormContainer';

export default function Router() {
  return (
    <Routes>
      <Route index path="/" element={<HomeScreen />} />
      <Route
        path="/register"
        element={
          <FormContainer>
            <FormContainer.RegisterScreen />
          </FormContainer>
        }
      />
      <Route
        path="/login"
        element={
          <FormContainer>
            <FormContainer.LoginScreen />
          </FormContainer>
        }
      />
      <Route path="/demo" element={<DemoScreen />} />
      <Route path="/faq" element={<FAQScreen />} />
    </Routes>
  );
}
