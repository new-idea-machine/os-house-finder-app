import { Route, Routes } from 'react-router-dom';

import DemoScreen from '@pages/DemoScreen';
import FAQScreen from '@pages/FAQScreen';
import HomeScreen from '@pages/HomeScreen';
import NewProfile from '@components/NewProfile';

export default function Router() {
  return (
    <Routes>
      <Route index path="/" element={<HomeScreen />} />
      <Route path="/demo" element={<DemoScreen />} />
      <Route path="/faq" element={<FAQScreen />} />
      <Route path="/profiles" element={<NewProfile />} />
    </Routes>
  );
}
