import { Route, Routes } from 'react-router-dom';

import Login from '@pages/LoginScreen';
import HomeScreen from '@pages/HomeScreen';
import FAQScreen from '@pages/FAQScreen';
import DemoScreen from '@pages/DemoScreen';
import RegisterScreen from '@pages/RegisterScreen';

export default function Router() {
  return (
    <Routes>
      <Route index path="/" element={<HomeScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/demo" element={<DemoScreen />} />
      <Route path="/faq" element={<FAQScreen />} />
    </Routes>
  );
}
