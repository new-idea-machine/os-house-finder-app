import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import DemoScreen from '@pages/DemoScreen';
import FAQScreen from '@pages/FAQScreen';
import HomeScreen from '@pages/HomeScreen';
import Profiles from '@pages/Profiles';
import Header from '@components/Header/Header';

export default function Router() {
  const location = useLocation();
  console.log(location.pathname);

  return (
    <>
      {location.pathname === '/' ? null : <Header />}
      <Routes>
        <Route index path="/" element={<HomeScreen />} />
        <Route path="/demo" element={<DemoScreen />} />
        <Route path="/faq" element={<FAQScreen />} />
        <Route path="/profiles" element={<Profiles />} />
      </Routes>
    </>
  );
}
