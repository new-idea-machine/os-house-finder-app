import { Route, Routes } from 'react-router-dom';

import DemoScreen from '@pages/DemoScreen';
import FAQScreen from '@pages/FAQScreen';
import HomeScreen from '@pages/HomeScreen';
import LoginScreen from '@pages/LoginScreen';
import RegisterScreen from '@pages/RegisterScreen';
import FormContainer from '@components/FormContainer';

export default function Router() {
  return (
    <Routes>
      <Route index path="/" element={<HomeScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
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
