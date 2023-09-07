import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Navigation from './components/Navigation';
import 'bootstrap/dist/css/bootstrap.min.css';


const App = () => {
  return (
  
    <Router>
      <Navigation/>
      <Routes>
        <Route path='/' element={<Landing />} />
      </Routes>
    </Router>
  );
};

export default App;
