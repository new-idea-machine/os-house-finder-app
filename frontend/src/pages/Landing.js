import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {

  return (
    <div>
      <h1> This is the Landing page</h1>
      <Link to='/'>
        <img width={1200} src='/images/DummyHouse.jpg' alt='logo'  />
      </Link>
    </div>
  );
};

export default Landing;
