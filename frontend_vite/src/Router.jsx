import { Route, Routes } from 'react-router-dom';

import Login from '@screens/LoginScreen';
import RegisterScreen from '@screens/RegisterScreen';
import HomeScreen from '@screens/HomeScreen';
import FAQScreen from '@screens/FAQScreen';
import DemoScreen from '@screens/DemoScreen';

export default function Router() {
  return (
    <Routes>
      <Route index={true} path="/" element={<HomeScreen />} />
      <Route path="/register" element={<RegisterScreen />} />
      <Route path="/login" element={<Login />} />
      <Route path="/demo" element={<DemoScreen />} />
      <Route path="/faq" element={<FAQScreen />} />
    </Routes>
  );
}
