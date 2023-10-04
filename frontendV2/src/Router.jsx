import { Route, Routes } from 'react-router-dom';

import HomeScreen from './pages/HomeScreen';
import FAQScreen from './pages/FAQScreen';
import DemoScreen from './pages/DemoScreen';
import RegisterScreen from './pages/RegisterScreen';
import Login from './pages/LoginScreen';

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
